import type { CollectionEntry } from 'astro:content'
import { getCollection } from 'astro:content'
import { slugify } from '@lib/posts'

export type ContentCollection = 'blog' | 'til'
export type Entry = CollectionEntry<ContentCollection>
export type TaxonomyKind = 'tag' | 'category'

export type TaxonomyLink = {
  kind: TaxonomyKind
  label: string
  slug: string
  href: string
}

export type EntryUrl = {
  collection: ContentCollection
  pathname: string
  href: string
}

export type SiteContent = {
  url(entry: Entry): EntryUrl
  taxonomy(
    kind: TaxonomyKind,
    label: string,
    collection: ContentCollection,
  ): TaxonomyLink
  list<C extends ContentCollection>(
    collection: C,
  ): Promise<readonly CollectionEntry<C>[]>
}

/** slug segment for URLs when frontmatter omits `slug` (entry id is filename without extension) */
export function getPostSlug(entry: Entry): string {
  return entry.data.slug ?? entry.id
}

function basePath(collection: ContentCollection): '/blog' | '/til' {
  return collection === 'blog' ? '/blog' : '/til'
}

export function createSiteContent(): SiteContent {
  return {
    url(entry) {
      const segment = getPostSlug(entry)
      const pathname = `${basePath(entry.collection)}/${segment}/`
      return {
        collection: entry.collection,
        pathname,
        href: pathname,
      }
    },

    taxonomy(kind, label, collection) {
      const segment = slugify(label)
      const prefix = kind === 'category' ? 'category' : 'tag'
      const href = `${basePath(collection)}/${prefix}/${segment}/`
      return {
        kind,
        label,
        slug: segment,
        href,
      }
    },

    async list<C extends ContentCollection>(collection: C) {
      const entries = await getCollection(collection, ({ data }) => !data.draft)
      return [...entries].sort(
        (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
      )
    },
  }
}
