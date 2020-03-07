/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import React, { useCallback } from "react"
import { graphql, Link } from "gatsby"
import { Layout, SEO, Avatar, Flexbox, Dialog, Gallery, Grid } from "../components"
import { FluidObject } from "gatsby-image"
import { useOnClickOutside, useLightboxNav } from "../hooks"
import Intro from "../utils/content-snippets/intro.md"
import loadable from '@loadable/component';
const PostCard = loadable(() => import('../components/postCard'));
const Img = loadable(() => import('gatsby-image'));

export type InstaNode = {
  node: {
    id: string;
    localImage: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    images: {
      standard_resolution: {
        width: number;
        height: number;
        url: string;
      };
    };
  };
}
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
}
type IndexPageProps = {
  data: {
    featuredInstaRecent: {
      edges: InstaNode[];
    };
    recentBlogPosts: {
      edges: MDXNode[];
    };
  };
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const ref = React.useRef()
  const { featuredInstaRecent: { edges: insta = [] } = {}, recentBlogPosts: { edges: posts = [] } = {} } = data

  const { showLightbox, setLightbox, selectedImage, setDir } = useLightboxNav(insta)

  const onClose = useCallback(
    function() {
      setLightbox(null)
    },
    [setLightbox]
  )
  const onPrev = useCallback(
    function() {
      setDir("prev")
    },
    [setDir]
  )
  const onNext = useCallback(
    function() {
      setDir("next")
    },
    [setDir]
  )
  useOnClickOutside(ref, () => setLightbox(null))

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

      <Intro />

      <Flexbox between bottom>
        <Flexbox vertical>
          <Styled.h2 sx={{ mb: 1 }}>Sketching</Styled.h2>
          <Styled.h3 sx={{ mb: 0 }}>My Favorite Explorations</Styled.h3>
        </Flexbox>
        <Styled.h5 sx={{ mx: 0, my: 0, textAlign: "right" }}>
          <Link to="/illustration">See more illustrations</Link>
        </Styled.h5>
      </Flexbox>

      <Gallery size={"s"} imageEdges={insta} setLightbox={setLightbox} sx={{ mt: 2, mb: 4 }} />

      <Flexbox between bottom>
        <Flexbox vertical>
          <Styled.h2 sx={{ mb: 1 }}>Writing</Styled.h2>
          <Styled.h3 sx={{ mb: 0 }}>Learning Through Writing</Styled.h3>
        </Flexbox>
        <Styled.h5 sx={{ mx: 0, my: 0, textAlign: "right" }}>
          <Link to="/blog">See all articles</Link>
        </Styled.h5>
      </Flexbox>

      <div sx={{ variant: "collection.post", mt: 2 }}>
        {posts.length > 0 &&
          posts.map(edge => (
                <PostCard
                key={edge.node.frontmatter.title}
                slug={`${edge.node.childMdxBlogPost.slug}`}
                title={edge.node.frontmatter.title}
                image={edge.node.frontmatter.cover && edge.node.frontmatter.cover.childImageSharp.fluid}
                />
          ))}
      </div>

      {showLightbox && (
        <Dialog onClose={onClose} onPrev={onPrev} onNext={onNext}>
          {!!selectedImage && <Img fluid={selectedImage.node.localImage.childImageSharp.fluid} />}
        </Dialog>
      )}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query PageQuery {
    ...recentBlogPosts
    ...featuredInstaRecent
  }
`
