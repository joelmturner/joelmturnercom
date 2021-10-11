import { graphql } from "gatsby";
import { FC } from "react";
import { jsx } from "theme-ui";
import Posts from "../components/posts";

const PostsCategoryRenderer: FC<any> = (props) => {
  return jsx(Posts, {
    ...props,
  });
};

export default PostsCategoryRenderer;

export const postsCategoryQuery = graphql`
  query PostsCategoryQuery($category: String) {
    allBlogPosts: allMdx(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      filter: {
        frontmatter: { draft: { eq: false }, category: { eq: $category } }
        fileAbsolutePath: { regex: "/content/blog/" }
      }
    ) {
      ...PostCard
    }
  }
`;
