import { jsx } from "theme-ui";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql } from "gatsby";
import TIL from "../components/til";

type NotesProps = {
  data: {
    mdx: {
      body: any;
    };
  };
};

function NotesRenderer(props: NotesProps) {
  if (!props?.data?.mdx?.body ?? false) {
    return null;
  }
  const { body } = props.data.mdx;
  const children = jsx(MDXRenderer, { children: body });

  return jsx(TIL, {
    ...props,
    ...props.data.mdx,
    children,
  });
}

export default NotesRenderer;

export const noteQuery = graphql`
  query ($id: String) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }, fileAbsolutePath: { regex: "/content/til/" }) {
      body
      frontmatter {
        category
        slug
        tags
        title
      }
    }
  }
`;
