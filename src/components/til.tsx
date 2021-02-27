/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import Layout from "./layout";
import { Link } from "gatsby";
import Flexbox from "./flexbox";
import { memo } from "react";

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
      <Flexbox noGrow gap={1} sx={{ mb: 3 }} middle role="navigation">
        <Link sx={{ variant: "link", textDecoration: "none", fontWeight: 700 }} to={`/til`}>
          TIL
        </Link>
        /
        <Link sx={{ variant: "link", textDecoration: "none", fontWeight: 700 }} to={`/til/${category}`}>
          {category}
        </Link>
        /<Styled.h4 sx={{ mb: 0, ml: 2 }}>{slug}</Styled.h4>
      </Flexbox>
      {children}
    </Layout>
  );
}

export default memo(TIL);
