import { jsx } from "theme-ui";
import { FC } from "react";
import Posts from "../../../../components/posts";
import { graphql } from "gatsby";
import { PostEdge } from "../../../../hooks/types";

const PostsRenderer: FC<any> = (props) => {
  const categoryFilter = (edge: PostEdge) => {
    return edge.node.frontmatter.category?.toLowerCase() === props.params.frontmatter__category.toLowerCase();
  };
  const filteredProps = {
    ...props,
    data: {
      allBlogPosts: {
        edges: props.data.allBlogPosts.edges.filter(categoryFilter),
      },
      recentBlogPosts: {
        edges: props.data.recentBlogPosts.edges.filter(categoryFilter),
      },
    },
  };
  return jsx(Posts, {
    ...filteredProps,
  });
};

export default PostsRenderer;

export const postsCategoryQuery = graphql`
  query PostsCategoryQuery {
    ...allBlogPosts
    ...recentBlogPosts
  }
`;
