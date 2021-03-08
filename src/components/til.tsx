/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import Layout from "./layout";
import { Link } from "gatsby";
import Flexbox from "./flexbox";
import { memo } from "react";
import { SEO } from "./index";

function TIL({
  data: {
    site: {
      siteMetadata: { title },
    },
  },
  path,
  children,
  params: { frontmatter__category: category, frontmatter__slug: slug },
  ...props
}: any) {
  return (
    <Layout {...props} title={title}>
      <SEO title={title} />
      <Flexbox noGrow gap={1} sx={{ mb: 3 }} middle role="navigation">
        <Link sx={{ variant: "link", textDecoration: "none", fontWeight: 700 }} to={`/til`}>
          TIL
        </Link>
        /
        <Link sx={{ variant: "link", textDecoration: "none", fontWeight: 700 }} to={`/til/${category}`}>
          {category}
        </Link>
        /<span sx={{ mb: 0, ml: 2 }}>{slug}</span>
      </Flexbox>
      {children}
    </Layout>
  );
}

export default memo(TIL);
