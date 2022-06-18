import * as fs from "fs";
import path from "path";
import matter from "gray-matter";
import { FrontMatter } from "./types";
import { bundleMDX } from "mdx-bundler";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";
import rehypeMetaAttribute from "./rehype-meta-attribute";
import rehypeHighlightCode from "./rehype-highlight-code";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

export function getAllPostIds() {
  const files = fs.readdirSync(postsDirectory, { withFileTypes: true });

  return files
    .map((file) => {
      if (!file.isDirectory()) return;

      const fullPath = path.join(postsDirectory, file.name, `index.mdx`);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      return {
        params: {
          id: matterResult.data.slug ?? file.name,
        },
      };
    })
    .filter((params) => params);
}

export async function getPostData(id: string): Promise<
  FrontMatter & {
    id: string;
    content: any;
    next: Pick<FrontMatter, "slug" | "title"> | null;
    prev: Pick<FrontMatter, "slug" | "title"> | null;
  }
> {
  const posts = getPosts();
  const postIndex = posts.findIndex((post) => post.slug === id);
  const nextIndex = postIndex + 1 < posts.length ? postIndex + 1 : null;
  const prevIndex = postIndex - 1 >= 0 ? postIndex - 1 : null;

  const next = nextIndex !== null ? { slug: posts[nextIndex].slug, title: posts[nextIndex].title } : null;
  const prev = prevIndex !== null ? { slug: posts[prevIndex].slug, title: posts[prevIndex].title } : null;

  const content = await bundleMDX({
    source: posts[postIndex].content,
    mdxOptions: function (options, frontmatter) {
      (options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeExternalLinks,
        rehypeHighlight,
        rehypeMetaAttribute,
        rehypeHighlightCode,
      ]),
        (options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm, remarkFrontmatter]);
      return options;
    },
  });

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
  sort: "date" | "name" = "date",
  sortBy: "ASC" | "DESC" = "DESC"
): Array<FrontMatter & { content: string }> {
  const files = fs.readdirSync(postsDirectory, { withFileTypes: true });

  const posts = files
    .map((file) => {
      if (!file.isDirectory()) return;

      const fullPath = path.join(postsDirectory, file.name, `index.mdx`);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      const frontMatter: FrontMatter = Object.keys(matterResult.data).reduce((acc, key) => {
        const value = ["date", "lastmod"].includes(key)
          ? new Date(matterResult.data[key]).valueOf()
          : matterResult.data[key];
        return { ...acc, [key]: value };
      }, {} as FrontMatter);
      return { content: matterResult.content, ...frontMatter };
    })
    .filter((post) => post)
    .sort((a, b) => {
      if (sort === "date") {
        return sortBy === "ASC" ? a.date - b.date : b.date - a.date;
      }
    });

  return posts;
}

export async function getLatestPost() {
  const posts = getPosts();
  return posts[0];
}
