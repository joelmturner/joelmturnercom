import { CreatePagesArgs } from "gatsby";
import { resolve } from "path";
import { slugify } from "../src/utils/utils";
import { AllMdxNode } from "./types";

export const createTILPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions;
  const tilIndexTemplate = resolve(`src/templates/til-index.tsx`);
  const tilPostTemplate = resolve(`src/templates/til-post.tsx`);
  const tilCategoriesTemplate = resolve(`src/templates/til-categories.tsx`);

  const result = await graphql<AllMdxNode>(`
    query {
      allMdx(filter: { fileAbsolutePath: { regex: "/content/til/" } }) {
        nodes {
          id
          frontmatter {
            title
            category
            slug
          }
        }
      }
    }
  `);

  let categories: string[] = [];

  result.data?.allMdx.nodes.forEach((node) => {
    if (node.frontmatter.category) {
      categories.push(node.frontmatter.category);
    }
  });

  categories = [...new Set(categories)];

  // til category pages
  categories.forEach((category) => {
    createPage({
      path: slugify(category, "/til"),
      component: tilCategoriesTemplate,
      context: {
        category,
      },
    });
  });

  // til index page
  createPage({
    path: `/til`,
    component: tilIndexTemplate,
    context: {},
  });

  // til posts
  result.data?.allMdx.nodes.forEach((node) => {
    const prefix = `/til/${slugify(node.frontmatter.category)}`;
    createPage({
      path: slugify(node.frontmatter.slug, prefix),
      component: tilPostTemplate,
      context: {
        id: node.id,
        title: node.frontmatter.title,
      },
    });
  });
};
