import { graphql } from "gatsby";
import { FC } from "react";
import { jsx } from "theme-ui";
import Posts from "../components/posts";

const PostsTagsRenderer: FC<any> = (props) => {
  return jsx(Posts, {
    ...props,
  });
};

export default PostsTagsRenderer;

export const postsTagsQuery = graphql`
  query PostsTagsQuery($tag: [String]) {
    allBlogPosts: allMdx(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      filter: {
        frontmatter: { draft: { eq: false }, tags: { in: $tag } }
        fileAbsolutePath: { regex: "/content/blog/" }
      }
    ) {
      ...PostCard
    }
  }
`;
