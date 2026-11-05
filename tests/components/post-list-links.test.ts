// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { loadRenderers } from 'astro:container'
import { getContainerRenderer } from '@astrojs/react/container-renderer'
import { getCollection } from 'astro:content'
import ContentList from '#components/astro/ContentList.astro'
import TagPage from '#pages/tags/[tag].astro'

/**
 * The blog list, the articles list and the tag pages link each entry to its detail route, which
 * takes `entry.id` as its URL segment (`src/pages/posts/[...slug].astro`, `content/[...slug].astro`).
 * Content-layer entries have no `slug`, so a link built from one reads `undefined`.
 * Expected URLs come from the real collections, so the assertions track the data.
 */

type Component = Parameters<AstroContainer['renderToString']>[0]
type RenderOptions = Parameters<AstroContainer['renderToString']>[1]

/**
 * Renders an Astro component or page to an HTML string through the container API. The page layout
 * nests a React breadcrumb, which throws `NoMatchingRenderer` without the React container renderer.
 */
const render = async (component: Component, options?: RenderOptions) => {
  const renderers = await loadRenderers([getContainerRenderer()])
  const container = await AstroContainer.create({ renderers })
  return container.renderToString(component, options)
}

/** Every `href` in the markup that points under the given path prefix. */
const hrefsUnder = (html: string, prefix: string): string[] =>
  [...html.matchAll(/href="([^"]+)"/g)]
    .map(match => match[1] as string)
    .filter(href => href.startsWith(prefix))

/** Published entries of a collection, as the list components see them. */
const published = (name: 'posts' | 'content') =>
  getCollection(name, ({ data }) => data.publish === true)

describe('post links on list pages', () => {
  it('ContentList links each post under /posts by its entry id', async () => {
    const posts = await published('posts')
    const html = await render(ContentList, { props: { page: { data: posts } } })

    expect(hrefsUnder(html, '/posts/').sort()).toEqual(posts.map(p => `/posts/${p.id}`).sort())
  })

  it('ContentList links under the route it is given', async () => {
    const articles = await published('content')
    const html = await render(ContentList, { props: { page: { data: articles }, to: 'content' } })

    // Guards a vacuous pass: with no articles, the equality below proves nothing.
    expect(articles.length).toBeGreaterThan(0)
    expect(hrefsUnder(html, '/content/').sort()).toEqual(
      articles.map(a => `/content/${a.id}`).sort()
    )
  })

  it('a tag page links the tagged posts by their entry id', async () => {
    const posts = await getCollection('posts', ({ data }) => data.tags?.includes('hooks') === true)
    const html = await render(TagPage, { params: { tag: 'hooks' }, props: { posts } })

    // The layout adds its own post links (navigation, sidebar), so read only the page body.
    const body = /<article[\s\S]*?<\/article>/.exec(html)?.[0] ?? ''

    expect(posts.length).toBeGreaterThan(0)
    expect(hrefsUnder(body, '/posts/').sort()).toEqual(posts.map(p => `/posts/${p.id}`).sort())
  })

  it('a tag page puts each post inside a list item', async () => {
    const posts = await getCollection(
      'posts',
      ({ data }) => data.tags?.includes('claude-code') === true
    )
    const html = await render(TagPage, { params: { tag: 'claude-code' }, props: { posts } })
    const body = /<article[\s\S]*?<\/article>/.exec(html)?.[0] ?? ''
    const list = /<ul data-list="unstyled"[^>]*>([\s\S]*?)<\/ul>/.exec(body)?.[1] ?? ''

    expect(posts.length).toBeGreaterThan(1)

    // One item per post. This also fails if the list pattern above matched nothing, or if every
    // post sat inside a single `li`.
    expect(list.match(/<li\b/g)).toHaveLength(posts.length)

    // A `ul` may only contain `li`. What is left after removing the items is a direct child, which
    // axe reports as a serious `list` violation once the list has content.
    expect(list.replace(/<li[\s\S]*?<\/li>/g, '').trim()).toBe('')
  })
})
