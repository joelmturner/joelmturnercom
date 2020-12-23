/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import Layout from "./layout";
import Link from "./link";
import { ReactElement } from "react";

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
      {data.allTil.nodes.map((note) => {
        const url = `${note.frontmatter.category}/${note.frontmatter.slug}`;
        return (
          <Styled.h3 key={url}>
            <Link to={url}>{note.frontmatter.slug}</Link>
          </Styled.h3>
        );
      })}
    </Layout>
  );
}

export default Tils;
