/** @jsx jsx */
import { jsx, Themed } from "theme-ui";
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
  frontmatter: { category, slug },
  ...props
}: any) {
  return (
    <Layout {...props} title={title} sx={{ variant: "post" }} variant="POST">
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
      <article sx={{ variant: "post.article" }}>{children}</article>
    </Layout>
  );
}

export default memo(TIL);
