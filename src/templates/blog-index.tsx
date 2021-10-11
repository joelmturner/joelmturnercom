import { jsx } from "theme-ui";
import { FC } from "react";
import Posts from "../components/posts";
import { graphql } from "gatsby";

const PostsRenderer: FC<any> = (props) => {
  return jsx(Posts, {
    ...props,
  });
};

export default PostsRenderer;

export const postsQuery = graphql`
  query PostsQuery {
    ...allBlogPosts
    ...recentBlogPosts
  }
`;
