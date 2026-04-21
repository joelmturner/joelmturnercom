import rss from '@astrojs/rss'
import { createSiteContent } from '@lib/content/siteContent'
import { SITE_DESCRIPTION, SITE_TITLE } from '@lib/site'

export async function GET(context: Record<string, any>) {
  const content = createSiteContent()
  const posts = await content.list('blog')
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: content.url(post).href,
      pubDate: post.data.date,
    })),
  })
}
