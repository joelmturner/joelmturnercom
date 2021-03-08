/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import React, { useCallback, useState } from "react";
import { graphql } from "gatsby";
import { Layout, SEO, Avatar, Flexbox, Gallery, Grid, Link } from "../components";
import { IGatsbyImageData } from "gatsby-plugin-image";
import PartialRenderer from "../components/partialRenderer";
import { PostsList } from "../components/PostsList";
import loadable from "@loadable/component";
const Dialog = loadable(() => import("../components"), { resolveComponent: (components) => components.Dialog });

export type InstaNode = {
  id: string;
  localFile: {
    childImageSharp: {
      fullSize: IGatsbyImageData;
      thumb: IGatsbyImageData;
    };
  };
};

export type MDXNode = {
  node: {
    excerpt: string;
    frontmatter: {
      title: string;
      cover: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
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

      <Grid gap={2} columns="75px 1fr" sx={{ mb: 3 }}>
        <Avatar />
        <Flexbox vertical left middle>
          <Styled.h1 sx={{ mb: 1 }}>Joel M. Turner</Styled.h1>
          <Styled.h2 sx={{ m: 0, color: "primary" }}>Frontend Developer</Styled.h2>
        </Flexbox>
      </Grid>

      <PartialRenderer mdx={mdx} />

      <Flexbox between bottom>
        <Flexbox vertical>
          <Styled.h2 sx={{ mb: 1, mt: 2 }}>Sketching</Styled.h2>
          <Styled.h3 sx={{ mb: 0, mt: 1 }}>My Favorite Explorations</Styled.h3>
        </Flexbox>
        <Styled.h4 sx={{ mx: 0, my: 0, textAlign: "right" }}>
          <Link to="/illustration">See more illustrations</Link>
        </Styled.h4>
      </Flexbox>

      <Gallery size={"s"} imageEdges={insta} setLightbox={handleSetOffset} sx={{ mt: 2, mb: 4 }} />

      <Flexbox between bottom>
        <Flexbox vertical>
          <Styled.h2 sx={{ mb: 1, mt: 0 }}>Writing</Styled.h2>
          <Styled.h3 sx={{ mb: 0, mt: 1 }}>Learning Through Writing</Styled.h3>
        </Flexbox>
        <Styled.h4 sx={{ mx: 0, my: 0, textAlign: "right" }}>
          <Link to="/blog">See all articles</Link>
        </Styled.h4>
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
