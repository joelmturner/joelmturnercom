/** @jsx jsx */
import { jsx } from "theme-ui";
import AboutContent from "../content/pages/about.md";
import SEO from "../components/seo";
import Layout from "../components/layout";
import { Avatar, Flexbox } from "../components";

export default () => {
  return (
    <Layout>
      <SEO title="About Joel M Turner" />
      <Flexbox center>
        <Avatar size="l" />
      </Flexbox>
      <AboutContent />
    </Layout>
  );
};
