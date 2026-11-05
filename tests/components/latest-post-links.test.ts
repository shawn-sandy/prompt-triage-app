// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { getCollection } from 'astro:content'
import CollectionList from '#components/astro/CollectionList.astro'
import PostsList from '#components/astro/PostsList.astro'

/**
 * The "Latest posts" lists build each link from the entry, and the post detail route
 * (`src/pages/posts/[...slug].astro`) takes `entry.id` as its URL segment. The content
 * layer entries have no `slug`, so a link built from one reads `/posts/undefined`.
 * Expected URLs here come from the real collection, so the assertions track the data.
 */

/** Renders an Astro component, optionally with props, to an HTML string through the container API. */
const render = async (
  component: Parameters<AstroContainer['renderToString']>[0],
  props?: Record<string, unknown>
) => {
  const container = await AstroContainer.create()
  return container.renderToString(component, props ? { props } : {})
}

/** Every `href` in the markup that points under `/posts/`. */
const postHrefs = (html: string): string[] =>
  [...html.matchAll(/href="([^"]+)"/g)]
    .map(match => match[1] as string)
    .filter(h => h.startsWith('/posts/'))

/** The URLs a visitor should be able to reach: one per published post. */
const publishedPostUrls = async (): Promise<string[]> =>
  (await getCollection('posts', ({ data }) => data.publish === true)).map(
    post => `/posts/${post.id}`
  )

describe('latest post links', () => {
  it('CollectionList links each post by its entry id', async () => {
    const valid = await publishedPostUrls()
    const hrefs = postHrefs(await render(CollectionList))

    // Guards a vacuous pass: with no links at all, the checks below prove nothing.
    expect(hrefs.length).toBeGreaterThan(0)
    expect(hrefs.filter(href => !valid.includes(href))).toEqual([])
  })

  it('PostsList links every published post by its entry id', async () => {
    const valid = await publishedPostUrls()

    // PostsList shows 10 posts unless told otherwise. Asking for every post keeps this test
    // about link targets, so a collection larger than the default does not fail it.
    const hrefs = postHrefs(await render(PostsList, { postLength: valid.length }))

    expect(hrefs.length).toBeGreaterThan(0)
    expect([...hrefs].sort()).toEqual([...valid].sort())
  })

  it('lists the newest post first, with no two posts sharing a publish time', async () => {
    const posts = await getCollection('posts', ({ data }) => data.publish === true)
    const times = posts.map(post => post.data.pubDate.getTime())

    // Equal times leave the sort, and so which posts count as "latest", to load order.
    expect(new Set(times).size).toBe(posts.length)

    const newest = posts.reduce((a, b) => (b.data.pubDate > a.data.pubDate ? b : a))
    expect(postHrefs(await render(CollectionList))[0]).toBe(`/posts/${newest.id}`)
  })
})
