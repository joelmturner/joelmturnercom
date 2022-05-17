/** @jsx jsx */
import { jsx, Themed } from "theme-ui";
import React, { useCallback, useState } from "react";
import { graphql } from "gatsby";
import { Layout, SEO, Avatar, Flexbox, Gallery, Grid, Link } from "../components";
import PartialRenderer from "../components/partialRenderer";
import { PostsList } from "../components/PostsList";
import loadable from "@loadable/component";
const Dialog = loadable(() => import("../components"), { resolveComponent: (components) => components.Dialog });

export type InstaNode = {
  id: string;
  secure_url: string;
};

export type MDXNode = {
  node: {
    excerpt: string;
    frontmatter: {
      title: string;
      tags: string[];
    };
    slug: string;
  };
};

type IndexPageProps = {
  data: {
    featuredInstaRecent: {
      nodes: InstaNode[];
    };
    recentBlogPosts: {
      edges: MDXNode[];
    };
    mdx: {
      body: any;
    };
  };
};

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const [offset, setOffset] = useState(-1);
  const { featuredInstaRecent: { nodes: insta = [] } = {}, recentBlogPosts: { edges: blog = [] } = {}, mdx } = data;

  const onClose = useCallback(
    function () {
      setOffset(-1);
    },
    [setOffset]
  );

  const handleSetOffset = useCallback(
    (edge) => {
      setOffset(insta.indexOf(edge));
    },
    [setOffset, insta]
  );

  return (
    <Layout title="Howdy!">
      <SEO title="Home" />

      <Grid gap={3} columns="75px 1fr" sx={{ mb: 3, alignItems: "center" }}>
        <Avatar />
        <Flexbox vertical left middle>
          <Themed.h1 sx={{ mb: 0 }}>Joel M. Turner</Themed.h1>
          <Themed.h2 sx={{ m: 0, color: "primary" }}>Frontend Developer</Themed.h2>
        </Flexbox>
      </Grid>

      <PartialRenderer mdx={mdx} />

      <Flexbox between bottom>
        <Flexbox vertical>
          <Themed.h2 sx={{ mb: 0, mt: 2 }}>Sketching</Themed.h2>
          <Themed.h3 sx={{ mb: 0, mt: 1 }}>My Favorite Explorations</Themed.h3>
        </Flexbox>
        <Themed.h4 sx={{ mx: 0, my: 0, textAlign: "right" }}>
          <Link to="/illustration">See more illustrations</Link>
        </Themed.h4>
      </Flexbox>

      <Gallery size={"s"} imageEdges={insta} setLightbox={handleSetOffset} sx={{ mt: 2, mb: 4 }} />

      <Flexbox between bottom>
        <Flexbox vertical>
          <Themed.h2 sx={{ mb: 0, mt: 0 }}>Writing</Themed.h2>
          <Themed.h3 sx={{ mb: 0, mt: 1 }}>Learning Through Writing</Themed.h3>
        </Flexbox>
        <Themed.h4 sx={{ mx: 0, my: 0, textAlign: "right" }}>
          <Link to="/blog">See all articles</Link>
        </Themed.h4>
      </Flexbox>

      <PostsList edges={blog} />

      {offset > -1 && <Dialog imageEdges={insta} offset={offset} onClose={onClose} />}
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query PageQuery {
    ...recentBlogPosts
    ...featuredInstaRecent
    mdx(slug: { eq: "intro" }) {
      frontmatter {
        title
      }
      body
      slug
    }
  }
`;
