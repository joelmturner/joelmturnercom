import { graphql, useStaticQuery } from "gatsby";
import { UsePostSeries, PostData } from "./types";

export function usePostSeries(series: string): UsePostSeries[] {
  const { allBlogPosts } = useStaticQuery<PostData>(graphql`
    query {
      ...allBlogPosts
    }
  `);
  const postsInSeries = allBlogPosts?.edges.filter((edge) => edge.node.frontmatter.series === series);

  return (
    (postsInSeries
      ?.sort((a, b) => (a?.node?.frontmatter?.order ?? 0) - (b?.node?.frontmatter?.order ?? 0))
      .map((edge) => ({ title: edge.node.frontmatter.title, slug: edge.node.slug })) as UsePostSeries[]) ?? []
  );
}
