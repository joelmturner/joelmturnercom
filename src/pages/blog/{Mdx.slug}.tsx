import { jsx } from "theme-ui";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { FC } from "react";
import { graphql } from "gatsby";
import Post from "../../components/Post";

const PostRenderer: FC<any> = (props) => {
  if (!props?.data?.mdx?.body ?? false) {
    return null;
  }
  const { body } = props.data.mdx;
  const children = jsx(MDXRenderer, { children: body });

  return jsx(Post, {
    ...props,
    ...props.data.mdx,
    children,
  });
};

export default PostRenderer;

export const postQuery = graphql`
  query($id: String) {
    mdx(id: { eq: $id }, fileAbsolutePath: { regex: "/content/blog/" }) {
      slug
      frontmatter {
        title
        tags
        category
        date
        draft
        series
        order
        cover {
          publicURL
        }
      }
      body
    }
  }
`;
