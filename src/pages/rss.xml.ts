import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'
import { SITE_DESCRIPTION, SITE_TITLE } from '@lib/site'

export async function GET(context: Record<string, any>) {
  const posts = await getCollection('blog')
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.reverse().map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: `/blog/${post.data.slug || post.id}/`,
      pubDate: post.data.date,
    })),
  })
}
