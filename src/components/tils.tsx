/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import Layout from "./layout";
import Link from "./link";
import { memo, ReactElement } from "react";
import { SEO } from "./index";

type TilsProps = {
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
};

function Tils({ data }: TilsProps): ReactElement {
  return (
    <Layout>
      <SEO title="Today I Learned" />
      {data.allTil.nodes.map((note) => {
        const url = `${note.frontmatter.category}/${note.frontmatter.slug}`;
        return (
          <Styled.h2 key={url}>
            <Link to={url}>{note.frontmatter.slug}</Link>
          </Styled.h2>
        );
      })}
    </Layout>
  );
}

export default memo(Tils);
