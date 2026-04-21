import type { CollectionEntry } from 'astro:content'

export { getPostSlug } from './siteContent'

/** chronological order: older posts first (prev = older, next = newer in layouts) */
export function sortPostsByDateAsc<
  T extends CollectionEntry<'blog'> | CollectionEntry<'til'>,
>(posts: T[]): T[] {
  return [...posts].sort(
    (a, b) => a.data.date.valueOf() - b.data.date.valueOf(),
  )
}
