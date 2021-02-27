import { graphql, useStaticQuery } from "gatsby";
import { PostData, UsePostSeries } from "./types";
import { useMemo } from "react";

export function usePostSeries(series: string): UsePostSeries[] {
  const { allBlogPosts } = useStaticQuery<PostData>(graphql`
    query {
      ...allBlogPosts
    }
  `);
  const postsInSeries = useMemo(
    () => allBlogPosts?.edges.filter((edge) => edge.node.frontmatter.series === series),
    []
  );

  return useMemo(
    () =>
      (postsInSeries
        ?.sort((a, b) => (a?.node?.frontmatter?.order ?? 0) - (b?.node?.frontmatter?.order ?? 0))
        .map((edge) => ({ title: edge.node.frontmatter.title, slug: edge.node.slug })) as UsePostSeries[]) ?? [],
    []
  );
}
