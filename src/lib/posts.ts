import * as fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { FrontMatter, PostType } from './types';
import { bundleMDX } from 'mdx-bundler';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeHighlight from 'rehype-highlight';
import rehypeMetaAttribute from './rehype-meta-attribute';
import rehypeHighlightCode from './rehype-highlight-code';
import remarkTableofContents from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import { slugify } from '../utils/utils';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');
const tilsDirectory = path.join(process.cwd(), 'src/content/til');

function getDirPath(type: PostType) {
  return type === 'post' ? postsDirectory : tilsDirectory;
}

export function getAllPostIds(type: PostType = 'post') {
  const dirPath = getDirPath(type);
  const fileNames = fs.readdirSync(dirPath, { withFileTypes: true });

  return fileNames
    .filter((file) => file.name.endsWith('.mdx'))
    .map((file) => {
      const fullPath = path.join(dirPath, file.name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      return {
        params: {
          id: matterResult.data.slug,
        },
      };
    });
}

export function getAllCategories() {
  const posts = getPosts();
  const categories = posts.reduce((acc, post) => {
    const category = post.category.toLowerCase();
    if (!acc.includes(category)) {
      acc.push(category);
    }
    return acc;
  }, []);
  return categories
    .map((category) => [{ params: { slug: category } }, { params: { slug: slugify(category) } }])
    .flat();
}

export function getAllTags() {
  const posts = getPosts();
  const resolvedTags = posts.reduce((acc, post) => {
    const tags = post.tags.map((tag) => [tag.toLowerCase(), slugify(tag)]).flat();
    acc = Array.from(new Set([...acc, ...tags]));
    return acc;
  }, []);
  return resolvedTags.map((tag) => ({ params: { slug: tag } }));
}

export async function bundleContent(
  post: FrontMatter & {
    content: string;
  }
) {
  const content = await bundleMDX({
    source: post.content,
    mdxOptions: function (options, frontmatter) {
      (options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeExternalLinks,
        rehypeHighlight,
        rehypeMetaAttribute,
        rehypeHighlightCode,
        rehypeSlug,
      ]),
        (options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          remarkGfm,
          remarkFrontmatter,
          [remarkTableofContents, { tight: true }],
        ]);
      return options;
    },
  });
  return content;
}

export async function getPostData(
  id: string,
  type: PostType = 'post'
): Promise<
  | (FrontMatter & {
      id: string;
      content: any;
      next: Pick<FrontMatter, 'slug' | 'title'> | null;
      prev: Pick<FrontMatter, 'slug' | 'title'> | null;
    })
  | null
> {
  const posts = getPosts(type);
  const postIndex = posts.findIndex((post) => post.slug === id);
  if (postIndex === -1) {
    return null;
  }

  const nextIndex = postIndex + 1 < posts.length ? postIndex + 1 : null;
  const prevIndex = postIndex - 1 >= 0 ? postIndex - 1 : null;

  const next =
    nextIndex !== null ? { slug: posts[nextIndex].slug, title: posts[nextIndex].title } : null;
  const prev =
    prevIndex !== null ? { slug: posts[prevIndex].slug, title: posts[prevIndex].title } : null;

  const content = await bundleContent(posts[postIndex]);

  // Combine the data with the id
  return {
    id,
    ...posts[postIndex],
    content: content.code,
    next,
    prev,
  };
}

export function getPosts(
  type: PostType = 'post',
  sort: 'date' | 'name' = 'date',
  sortBy: 'ASC' | 'DESC' = 'DESC'
): Array<FrontMatter & { content: string }> {
  const dirPath = getDirPath(type);
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  const posts = files
    .map((file) => {
      if (!file.name.includes('.mdx')) return;

      const fullPath = path.join(dirPath, file.name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      const frontMatter: FrontMatter = Object.keys(matterResult.data).reduce((acc, key) => {
        const value = ['date', 'lastmod'].includes(key)
          ? new Date(matterResult.data[key]).valueOf()
          : matterResult.data[key];
        return { ...acc, [key]: value };
      }, {} as FrontMatter);
      return { content: matterResult.content, ...frontMatter };
    })
    .filter((post) => post)
    .sort((a, b) => {
      if (sort === 'date') {
        return sortBy === 'ASC' ? a.date - b.date : b.date - a.date;
      }
    });

  return posts;
}

export async function getLatestPost() {
  const posts = getPosts();
  return posts[0];
}

export function getPostsByCategory(slug: string) {
  const posts = getPosts();
  return posts.filter((post) => slugify(post.category) === slug);
}

export function getPostsByTag(slug: string) {
  const posts = getPosts();

  return posts.filter((post) => {
    const tags = post.tags.map((tag) => slugify(tag)) ?? [];
    return tags.includes(slug);
  });
}
