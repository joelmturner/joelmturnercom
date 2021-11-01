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
      };
      slug: string;
    }[];
  };
};
export type DraftMdxNode = {
  drafts: {
    nodes: {
      id: string;
      excerpt: string;
      frontmatter: {
        title: string;
        category: string;
        tags: string;
        slug: string;
      };
      slug: string;
    }[];
  };
};
