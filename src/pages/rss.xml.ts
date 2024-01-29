import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context: Record<string, any>) {
  const posts = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.reverse().map((post) => ({
      title: post.data.title,
      description: post.data.excerpt || post.data.description,
      link: `/blog/${post.slug}/`,
      pubDate: post.data.date,
    })),
  });
}
