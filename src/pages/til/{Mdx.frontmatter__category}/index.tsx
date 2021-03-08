/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { graphql } from "gatsby";
import Link from "../../../components/link";
import Layout from "../../../components/layout";
import { ReactElement } from "react";
import Flexbox from "../../../components/flexbox";
import { slugify } from "../../../utils/utils";

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
  params: {
    frontmatter__category: string;
  };
};

function TILCategory({ data, params }: TILCategoryProps): ReactElement {
  return (
    <Layout>
      <Flexbox noGrow gap={1} sx={{ mb: 3 }} middle role="navigation">
        <Link sx={{ variant: "link", textDecoration: "none", fontWeight: 700 }} to={`/til`}>
          TIL
        </Link>
        /
        <Link
          sx={{ variant: "link", textDecoration: "none", fontWeight: 700 }}
          to={slugify(params.frontmatter__category, `/til`)}
        >
          {params.frontmatter__category}
        </Link>
      </Flexbox>

      {data.allTil.nodes
        .filter((note) => note.frontmatter.category === params.frontmatter__category)
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
  query TilCategoryQuery {
    ...allTil
  }
`;
