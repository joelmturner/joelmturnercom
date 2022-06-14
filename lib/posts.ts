import * as fs from "fs";
import path from "path";
import matter from "gray-matter";
import { FrontMatter } from "./types";

const postsDirectory = "content/blog";

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, ""),
      },
    };
  });
}

export function getPostData(id: string): FrontMatter & {
  id: string;
  content: string;
} {
  const fullPath = path.join(postsDirectory, id.toLowerCase(), `index.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const frontMatter: FrontMatter = Object.keys(matterResult.data).reduce((acc, key) => {
    const value = ["date", "lastmod"].includes(key)
      ? new Date(matterResult.data[key]).valueOf()
      : matterResult.data[key];
    return { ...acc, [key]: value };
  }, {} as FrontMatter);

  // Combine the data with the id
  return {
    id,
    ...frontMatter,
    content: matterResult.content,
  };
}

export function getPosts(sort: "date" | "name" = "date", sortBy: "ASC" | "DESC" = "DESC"): Array<FrontMatter> {
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
      return frontMatter;
    })
    .filter((post) => post)
    .sort((a, b) => {
      if (sort === "date") {
        return sortBy === "ASC" ? a.date - b.date : b.date - a.date;
      }
    });

  return posts;
}
