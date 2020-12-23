/** @jsx jsx */
import { jsx } from "theme-ui";
import { graphql, useStaticQuery } from "gatsby";
import SEO from "../components/seo";
import Layout from "../components/layout";
import { Avatar, Flexbox } from "../components";
import PartialRenderer from "../components/partialRenderer";

export default () => {
  const data = useStaticQuery(graphql`
    query AboutPageQuery {
      mdx(slug: { eq: "about" }) {
        frontmatter {
          title
        }
        body
        slug
      }
    }
  `);

  return (
    <Layout>
      <SEO title="About Joel M Turner" />
      <Flexbox center>
        <Avatar size="l" />
      </Flexbox>
      <PartialRenderer mdx={data.mdx} />
    </Layout>
  );
};
