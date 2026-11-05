import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET() {
  const posts = await getCollection('posts')
  return rss({
    title: 'prompt-triage | Blog',
    description: 'Short explainers on the prompt-triage Claude Code plugin',
    site: 'https://my-blog-site.netlify.app',
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  })
}
