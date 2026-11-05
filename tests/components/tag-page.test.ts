// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { loadRenderers } from 'astro:container'
import { getContainerRenderer } from '@astrojs/react/container-renderer'
import TagList from '#components/astro/TagList.astro'
import TagIndex from '#pages/tags/index.astro'

/**
 * Two posts, one without tags. `tags` is optional in the posts schema, so a tagless post is
 * legal content; the tag page must not turn it into a page of its own.
 */
vi.mock('astro:content', () => ({
  getCollection: vi.fn(async () => [
    { id: 'tagged', data: { title: 'Tagged', description: 'A tagged post', tags: ['alpha'] } },
    { id: 'tagless', data: { title: 'Tagless', description: 'A post with no tags' } },
  ]),
}))

/** The parts of the tag page module this test reads; `.astro` modules are typed as components only. */
type TagPageModule = {
  prerender?: boolean
  getStaticPaths: () => Promise<{ params: { tag?: string }; props: { posts: { id: string }[] } }[]>
}

/** Loads the tag page after the content mock above is in place. */
const loadTagPage = async (): Promise<TagPageModule> =>
  (await import('#pages/tags/[tag].astro')) as unknown as TagPageModule

describe('tag pages', () => {
  it('are prerendered, so the posts from getStaticPaths reach the page', async () => {
    // The site runs in server mode, where Astro ignores `getStaticPaths` props for a page that is
    // not prerendered. The page then received no posts and rendered an empty body.
    expect((await loadTagPage()).prerender).toBe(true)
  })

  it('make one page per tag and none for a post without tags', async () => {
    const paths = await (await loadTagPage()).getStaticPaths()

    // A route parameter of `undefined` fails a static build, so it must never be produced.
    expect(paths.map(path => path.params.tag)).toEqual(['alpha'])
    expect(paths[0]?.props.posts.map(post => post.id)).toEqual(['tagged'])
  })
})

/**
 * Renders an Astro component or page to an HTML string. The page layout nests a React breadcrumb,
 * which throws `NoMatchingRenderer` without the React container renderer.
 */
const render = async (component: Parameters<AstroContainer['renderToString']>[0]) => {
  const renderers = await loadRenderers([getContainerRenderer()])
  const container = await AstroContainer.create({ renderers })
  return container.renderToString(component)
}

/** Every `/tags/...` link in the markup. */
const tagLinks = (html: string): string[] =>
  [...html.matchAll(/href="(\/tags\/[^"]*)"/g)].map(match => match[1] as string)

describe('tag lists', () => {
  // Every link here must reach a page that `getStaticPaths` generates, and that is one page per
  // tag, so a post without tags must not add a `/tags/undefined` link.
  it('the sidebar list links only to tags that have a page', async () => {
    expect(tagLinks(await render(TagList))).toEqual(['/tags/alpha'])
  })

  it('the tag index links only to tags that have a page', async () => {
    const body = /<article[\s\S]*?<\/article>/.exec(await render(TagIndex))?.[0] ?? ''

    expect(tagLinks(body)).toEqual(['/tags/alpha'])
  })
})
