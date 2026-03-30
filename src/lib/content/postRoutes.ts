import type { CollectionEntry } from 'astro:content'

/** slug segment for URLs when frontmatter omits `slug` (entry id is filename without extension) */
export function getSlugFromEntryId(id: string): string {
  return id
}

export function getPostSlug(
  entry: CollectionEntry<'blog'> | CollectionEntry<'til'>,
): string {
  return entry.data.slug ?? getSlugFromEntryId(entry.id)
}

/** chronological order: older posts first (prev = older, next = newer in layouts) */
export function sortPostsByDateAsc<
  T extends CollectionEntry<'blog'> | CollectionEntry<'til'>,
>(posts: T[]): T[] {
  return [...posts].sort(
    (a, b) => a.data.date.valueOf() - b.data.date.valueOf(),
  )
}
