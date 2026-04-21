import type { CollectionEntry } from 'astro:content'
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import _isString from 'lodash/isString'

// function to replace spaces with hyphens
// and convert everything to lowercase
export function slugify(string: string) {
  if (!_isString(string) || _isEmpty(string)) {
    return ''
  }

  return _get(string, 'toString', () => string)
    .call(string)
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

function filterByCategory(
  posts: (CollectionEntry<'blog'> | CollectionEntry<'til'>)[],
  category: string,
) {
  return posts
    .filter((post) => post.data.categories.toLowerCase() === category)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

function filterByTag(
  posts: (CollectionEntry<'blog'> | CollectionEntry<'til'>)[],
  segment: string,
) {
  return posts
    .filter((post) => post.data.tags.some((raw) => slugify(raw) === segment))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export function getAllCategories(
  posts: (CollectionEntry<'blog'> | CollectionEntry<'til'>)[],
) {
  const categories = posts.reduce((acc, post) => {
    const category = post.data.categories.toLowerCase()
    if (!acc.includes(category)) {
      acc.push(category)
    }
    return acc
  }, [] as string[])
  // only emit kebab-case slugs so we have one canonical URL per category (no duplicate /category/personal%20development/)
  return categories.map((category) => ({
    params: { slug: slugify(category) },
    props: {
      posts: filterByCategory(posts, category.toLowerCase()),
      category,
    },
  }))
}

export function getAllTags(
  posts: (CollectionEntry<'blog'> | CollectionEntry<'til'>)[],
) {
  const segments = new Set<string>()
  for (const post of posts) {
    for (const raw of post.data.tags) {
      const seg = slugify(raw)
      if (seg) segments.add(seg)
    }
  }
  return [...segments].map((segment) => {
    const postsForTag = filterByTag(posts, segment)
    const displayTag =
      postsForTag[0]?.data.tags.find((t) => slugify(t) === segment) ?? segment
    return {
      params: { slug: segment },
      props: { posts: postsForTag, tag: displayTag },
    }
  })
}
