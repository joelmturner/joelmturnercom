export type AllMdxNode = {
  allMdx: {
    nodes: {
      id: string;
      excerpt: string;
      frontmatter: {
        title: string;
        category: string;
        tags: string;
        slug: string;
        cover: {
          childImageSharp: {
            gatsbyImageData: any;
          };
        };
      };
      slug: string;
    }[];
  };
};
