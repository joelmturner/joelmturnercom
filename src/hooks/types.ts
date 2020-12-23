export type PostEdge = {
  node: {
    slug: string;
    frontmatter: {
      title?: string;
      series?: string;
      order?: number;
      category?: string;
    };
  };
};

export type PostData = {
  allBlogPosts: {
    edges: PostEdge[];
  };
};

export type UsePostSeries = { title: string; slug: string };

export type PostNode = {
  slug: string;
  frontmatter: {
    title: string;
  };
};
