import type { CollectionEntry } from 'astro:content'
import { getPostSlug } from './siteContent'

type BlogEntry = CollectionEntry<'blog'>

function bySeriesOrderThenDate(a: BlogEntry, b: BlogEntry): number {
  const orderA = a.data.seriesOrder ?? Number.POSITIVE_INFINITY
  const orderB = b.data.seriesOrder ?? Number.POSITIVE_INFINITY
  if (orderA !== orderB) return orderA - orderB
  return a.data.date.valueOf() - b.data.date.valueOf()
}

function buildSlugMap(posts: BlogEntry[]): Map<string, BlogEntry> {
  const map = new Map<string, BlogEntry>()
  for (const post of posts) {
    map.set(getPostSlug(post), post)
  }
  return map
}

/** topical related posts: explicit relatedPosts first, then same-series siblings */
export function resolveRelatedPosts(
  post: BlogEntry,
  allPosts: BlogEntry[],
): BlogEntry[] {
  const published = allPosts.filter((p) => !p.data.draft)
  const slugMap = buildSlugMap(published)
  const currentSlug = getPostSlug(post)
  const seen = new Set<string>([currentSlug])
  const result: BlogEntry[] = []

  const add = (entry: BlogEntry | undefined) => {
    if (!entry) return
    const slug = getPostSlug(entry)
    if (seen.has(slug)) return
    seen.add(slug)
    result.push(entry)
  }

  for (const slug of post.data.relatedPosts ?? []) {
    const entry = slugMap.get(slug)
    if (!entry) {
      console.warn(
        `[relatedPosts] "${currentSlug}" references unknown slug "${slug}"`,
      )
      continue
    }
    add(entry)
  }

  if (post.data.series) {
    const siblings = published
      .filter(
        (p) =>
          p.data.series === post.data.series && getPostSlug(p) !== currentSlug,
      )
      .sort(bySeriesOrderThenDate)
    for (const sibling of siblings) {
      add(sibling)
    }
  }

  return result
}
