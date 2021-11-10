import { CreatePagesArgs } from "gatsby";
import { resolve } from "path";
import getShareImage from "@jlengstorf/get-share-image";
import _camelCase from "just-camel-case";
import { slugify } from "../src/utils/utils";
import { AllMdxNode, DraftMdxNode } from "./types";

const isDev = process.env.NODE_ENV === "development";

export const createBlogPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions;
  const blogIndexTemplate = resolve(`src/templates/blog-index.tsx`);
  const blogPostTemplate = resolve(`src/templates/blog-post.tsx`);
  const blogTagsTemplate = resolve(`src/templates/blog-tags.tsx`);
  const blogCategoriesTemplate = resolve(`src/templates/blog-categories.tsx`);

  const result = await graphql<AllMdxNode & DraftMdxNode>(`
    query {
      drafts: allMdx(filter: { fileAbsolutePath: { regex: "/content/blog/" }, frontmatter: { draft: { eq: true } } }) {
        nodes {
          id
          slug
          frontmatter {
            title
            category
            tags
          }
        }
      }
      allMdx(filter: { fileAbsolutePath: { regex: "/content/blog/" } }) {
        nodes {
          id
          slug
          frontmatter {
            title
            category
            tags
          }
        }
      }
    }
  `);

  let categories: string[] = [];
  let tags: string[] = [];

  const posts = isDev
    ? [...(result.data?.allMdx.nodes ?? []), ...(result.data?.drafts.nodes ?? [])]
    : result.data?.allMdx.nodes ?? [];

  posts.forEach((node) => {
    if (node.frontmatter.category) {
      categories.push(node.frontmatter.category);
    }
    if (node.frontmatter.tags) {
      const postTags = new Set(node.frontmatter.tags);
      tags = [...tags, ...postTags];
    }
  });

  categories = [...new Set(categories)];
  tags = [...new Set(tags)];

  // blog index page
  categories.forEach((category) => {
    createPage({
      path: slugify(category, "/blog/category"),
      component: blogCategoriesTemplate,
      context: {
        category,
      },
    });
  });

  // blog tags page
  tags.forEach((tag) => {
    createPage({
      path: slugify(tag, "/blog/tag"),
      component: blogTagsTemplate,
      context: {
        tag,
      },
    });
  });

  // blog index page
  createPage({
    path: `/blog`,
    component: blogIndexTemplate,
    context: {},
  });

  // blog posts
  posts.forEach((node) => {
    const socialImage = getShareImage({
      title: node.frontmatter.title,
      tagline: (node.frontmatter.tags as unknown as string[]).map((tag) => `#${_camelCase(tag)}`).join(", "),
      cloudName: "joelmturner",
      imagePublicID: "blog-post-card",
      titleFont: "futura",
      taglineFont: "futura",
      textColor: "232129",
    } as any);

    createPage({
      path: slugify(node.slug, "/blog"),
      component: blogPostTemplate,
      context: {
        id: node.id,
        title: node.frontmatter.title,
        socialImage,
      },
    });
  });
};
