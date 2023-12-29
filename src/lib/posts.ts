import _isString from "lodash/isString";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import type { CollectionEntry } from "astro:content";

// function to replace spaces with hyphens
// and convert everything to lowercase
export function slugify(string: string) {
  if (!_isString(string) || _isEmpty(string)) {
    return "";
  }

  return _get(string, "toString", () => string)
    .call(string)
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

function filterByCategory(
  posts: (CollectionEntry<"blog"> | CollectionEntry<"til">)[],
  category: string,
) {
  return posts
    .filter((post) => post.data.categories.toLowerCase() === category)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

function filterByTag(
  posts: (CollectionEntry<"blog"> | CollectionEntry<"til">)[],
  tag: string,
) {
  return posts
    .filter((post) =>
      post.data.tags
        .map((tag) => tag.toLowerCase())
        .includes(tag.toLowerCase()),
    )
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function getAllCategories(
  posts: (CollectionEntry<"blog"> | CollectionEntry<"til">)[],
) {
  const categories = posts.reduce((acc, post) => {
    const category = post.data.categories.toLowerCase();
    if (!acc.includes(category)) {
      acc.push(category);
    }
    return acc;
  }, [] as string[]);
  return categories
    .map((category) => [
      {
        params: { slug: category },
        props: {
          posts: filterByCategory(posts, category.toLowerCase()),
          category,
        },
      },
      {
        params: { slug: slugify(category) },
        props: {
          posts: filterByCategory(posts, category.toLowerCase()),
          category,
        },
      },
    ])
    .flat();
}

export function getAllTags(
  posts: (CollectionEntry<"blog"> | CollectionEntry<"til">)[],
) {
  const resolvedTags = posts.reduce((acc, post) => {
    const tags = post.data.tags
      .map((tag) => [tag.toLowerCase(), slugify(tag)])
      .flat();
    acc = Array.from(new Set([...acc, ...tags]));
    return acc;
  }, [] as string[]);
  return resolvedTags.map((tag) => ({
    params: { slug: tag },
    props: { posts: filterByTag(posts, tag), tag },
  }));
}
