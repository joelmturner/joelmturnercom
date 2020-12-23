/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { graphql } from "gatsby";
import Link from "../../../components/link";
import Layout from "../../../components/layout";
import { ReactElement } from "react";
import Flexbox from "../../../components/flexbox";

type BlogCategoryIndexProps = {
  data: {
    blogCategories: {
      nodes: Array<{
        frontmatter: {
          category: string;
        };
      }>;
    };
  };
  params: {
    frontmatter__category: string;
  };
};

function BlogCategoryIndex({ data, params }: BlogCategoryIndexProps): ReactElement {
  const categories = data.blogCategories.nodes.map((node) => node.frontmatter.category);
  const set = [...new Set(categories)];

  return (
    <Layout>
      {set.map((category) => {
        const url = `${category}`;
        return (
          <Styled.h3 key={url}>
            <Link to={url}>{url}</Link>
          </Styled.h3>
        );
      })}
    </Layout>
  );
}

export default BlogCategoryIndex;

export const blogCategoryIndexQuery = graphql`
  query BlogCategoryIndexQuery {
    blogCategories: allMdx(filter: { fileAbsolutePath: { regex: "/content/blog/" } }) {
      nodes {
        frontmatter {
          category
        }
      }
    }
  }
`;
