import { allBlogs, allTILs, Blog, TIL } from 'contentlayer/generated';
import { slugify } from '../utils/utils';
import { PostType } from './types';

const TYPE_VS_POSTS = {
  post: allBlogs,
  til: allTILs,
};

export function getAllPostIds(type: PostType = 'post') {
  const posts = TYPE_VS_POSTS[type];
  return posts.map((post: Blog | TIL) => {
    return {
      params: {
        id: post.slug,
      },
    };
  });
}

export function getAllCategories(postType: PostType = 'post') {
  const posts = getAllPostsSorted(postType);
  const categories = posts.reduce((acc, post) => {
    const category = post.category.toLowerCase();
    if (!acc.includes(category)) {
      acc.push(category);
    }
    return acc;
  }, [] as string[]);
  return categories
    .map((category) => [{ params: { slug: category } }, { params: { slug: slugify(category) } }])
    .flat();
}

export function getAllTags(postType: PostType = 'post') {
  const posts = getAllPostsSorted(postType);
  const resolvedTags = posts.reduce((acc, post) => {
    const tags = post.tags.map((tag) => [tag.toLowerCase(), slugify(tag)]).flat();
    acc = Array.from(new Set([...acc, ...tags]));
    return acc;
  }, [] as string[]);
  return resolvedTags.map((tag) => ({ params: { slug: tag } }));
}

export function getAllPostsByCategory(slug: string, type: PostType = 'post'): Array<Blog | TIL> {
  const posts = getAllPostsSorted(type);
  return posts.filter((post) => slugify(post.category) === slug);
}

export function getAllPostsByTag(slug: string, type: PostType = 'post'): Array<Blog | TIL> {
  return getAllPostsSorted(type).filter((post: Blog | TIL) => {
    const tags = post.tags.map((tag) => [slugify(tag), tag]).flat() ?? [];
    return tags.includes(slug);
  });
}

export function getAllPostsSorted<T extends Blog | TIL = Blog>(type: PostType = 'post'): T[] {
  return TYPE_VS_POSTS[type].sort((a: Blog | TIL, b: Blog | TIL) => {
    if (a.date < b.date) {
      return 1;
    } else if (a.date > b.date) {
      return -1;
    } else {
      return 0;
    }
  }) as T[];
}

export function getPostBySlug(
  slug: string,
  type: PostType = 'post'
): Blog & { next: Blog; prev: Blog } {
  const posts = getAllPostsSorted(type);
  const blogIndex = posts.findIndex((post) => post.slug === slug);

  return {
    ...posts[blogIndex],
    next: posts[blogIndex + 1] ?? null,
    prev: posts[blogIndex - 1] ?? null,
  };
}
