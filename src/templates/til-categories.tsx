/** @jsx jsx */
import { jsx, Themed } from "theme-ui";
import { graphql } from "gatsby";
import { ReactElement } from "react";
import { Flexbox, Layout, Link } from "../components";
import { slugify } from "../utils/utils";

type TILCategoryProps = {
  data: {
    allTil: {
      nodes: Array<{
        slug: string;
        frontmatter: {
          category: string;
          slug: string;
        };
      }>;
    };
  };
  pageContext: {
    category: string;
  };
};

function TILCategory({ data, pageContext: { category }, ...rest }: TILCategoryProps): ReactElement {
  return (
    <Layout>
      <Flexbox noGrow gap={1} sx={{ mb: 3 }} middle role="navigation">
        <Link sx={{ variant: "link", textDecoration: "none", fontWeight: 700 }} to={`/til`}>
          TIL
        </Link>
        /
        <Link sx={{ variant: "link", textDecoration: "none", fontWeight: 700 }} to={slugify(category, `/til`)}>
          {category}
        </Link>
      </Flexbox>

      {data.allTil.nodes
        .filter((note) => note.frontmatter.category === category)
        .map((note) => {
          const url = `/til/${slugify(note.frontmatter.category)}/${slugify(note.frontmatter.slug)}`;
          return (
            <Link key={url} to={url}>
              {note.frontmatter.slug}
            </Link>
          );
        })}
    </Layout>
  );
}

export default TILCategory;

export const tilCategoryQuery = graphql`
  query TilCategoryQuery($category: String) {
    allTil: allMdx(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      filter: {
        frontmatter: { draft: { eq: false }, category: { eq: $category } }
        fileAbsolutePath: { regex: "/content/til/" }
      }
    ) {
      nodes {
        body
        frontmatter {
          category
          slug
          tags
          title
        }
      }
    }
  }
`;
