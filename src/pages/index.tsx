/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import React, { useCallback, useState } from "react";
import { graphql } from "gatsby";
import { Layout, SEO, Avatar, Flexbox, Dialog, Gallery, Grid, Link } from "../components";
import { FluidObject } from "gatsby-image";
import Intro from "../utils/content-snippets/intro.md";
import loadable from "@loadable/component";
const PostCard = loadable(() => import("../components/postCard"));

export type InstaNode = {
  id: string;
  localFile: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
};
type MDXNode = {
  node: {
    excerpt: string;
    frontmatter: {
      title: string;
      cover: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
    childMdxBlogPost: {
      slug: string;
    };
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
  };
};

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const [offset, setOffset] = useState(-1);
  const { featuredInstaRecent: { nodes: insta = [] } = {}, recentBlogPosts: { edges: posts = [] } = {} } = data;

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
          <Styled.h3 sx={{ m: 0 }}>Frontend Developer</Styled.h3>
        </Flexbox>
      </Grid>

      <Intro sx={{ a: { color: "green" } }} />

      <Flexbox between bottom>
        <Flexbox vertical>
          <Styled.h2 sx={{ mb: 1, mt: 2 }}>Sketching</Styled.h2>
          <Styled.h3 sx={{ mb: 0, mt: 1 }}>My Favorite Explorations</Styled.h3>
        </Flexbox>
        <Styled.h5 sx={{ mx: 0, my: 0, textAlign: "right" }}>
          <Link to="/illustration">See more illustrations</Link>
        </Styled.h5>
      </Flexbox>

      <Gallery size={"s"} imageEdges={insta} setLightbox={handleSetOffset} sx={{ mt: 2, mb: 4 }} />

      <Flexbox between bottom>
        <Flexbox vertical>
          <Styled.h2 sx={{ mb: 1, mt: 0 }}>Writing</Styled.h2>
          <Styled.h3 sx={{ mb: 0, mt: 1 }}>Learning Through Writing</Styled.h3>
        </Flexbox>
        <Styled.h5 sx={{ mx: 0, my: 0, textAlign: "right" }}>
          <Link to="/blog">See all articles</Link>
        </Styled.h5>
      </Flexbox>

      <div sx={{ variant: "collection.post", mt: 2 }}>
        {posts.length > 0 &&
          posts.map((edge) => (
            <PostCard
              key={edge.node.frontmatter.title}
              slug={`${edge.node.childMdxBlogPost.slug}`}
              title={edge.node.frontmatter.title}
              image={edge.node.frontmatter.cover && edge.node.frontmatter.cover.childImageSharp.fluid}
            />
          ))}
      </div>

      {offset > -1 && <Dialog imageEdges={insta} offset={offset} onClose={onClose} />}
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query PageQuery {
    ...recentBlogPosts
    ...featuredInstaRecent
  }
`;
