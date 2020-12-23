import { graphql, useStaticQuery } from "gatsby";
import { PostEdge, PostNode } from "./types";

export function usePostNav(slug: string): { previous: PostNode | null; next: PostNode | null } {
  const { navPosts } = useStaticQuery<{
    navPosts: { edges: Array<PostEdge & { previous: PostNode; next: PostNode }> };
  }>(graphql`
    query {
      navPosts: allMdx(
        sort: { fields: [frontmatter___date, frontmatter___title], order: ASC }
        filter: { frontmatter: { draft: { eq: false } }, fileAbsolutePath: { regex: "/content/blog/" } }
      ) {
        edges {
          next {
            slug
            frontmatter {
              title
            }
          }
          previous {
            slug
            frontmatter {
              title
            }
          }
          node {
            slug
          }
        }
      }
    }
  `);

  const found = navPosts?.edges.find((edge) => edge.node.slug === slug);

  return {
    previous: found?.previous ?? null,
    next: found?.next ?? null,
  };
}
