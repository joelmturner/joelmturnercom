/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { FluidObject } from "gatsby-image"
import Avatar from "../components/avatar"
import Flexbox from "../components/flexbox"
import PostCard from "../components/postCard"
import { useOnClickOutside, useLightboxNav } from "../hooks"
import Dialog from "../components/dialog"
import Img from "gatsby-image"
import { FaTh, FaThLarge, FaSquare, FaCaretDown, FaCaretUp } from "react-icons/fa"
import Gallery, { GallerySizes } from "../components/gallery"

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
  useOnClickOutside(ref, () => setLightbox(null))

  return (
    <Layout title="Howdy!">
      <SEO title="Home" />

      <div
        sx={{
          display: "grid",
          gridTemplateColumns: `75px 1fr`,
          gridGap: 2,
          mb: 3,
        }}
      >
        <Avatar />
        <Flexbox vertical center>
          <Styled.h1 sx={{ mb: 1 }}>Joel M. Turner</Styled.h1>
          <Styled.h3 sx={{ m: 0 }}>Frontend Developer</Styled.h3>
        </Flexbox>
      </div>
      <Styled.p>
        {
          "My background is in graphic design and web development. I'm currently working as a Front-End Developer at Sprinklr. I spend some of my free time exploring hand lettering and sketching as well as hiking in the Portland area with my wife and son."
        }
      </Styled.p>

      <Flexbox between bottom>
        <Flexbox vertical>
          <Styled.h2 sx={{ mb: 1 }}>Sketching</Styled.h2>
          <Styled.h3 sx={{ mb: 1 }}>My Favorite Explorations</Styled.h3>
        </Flexbox>
        <Styled.h5 sx={{ mx: 0, my: 0, textAlign: "right" }}>
          <Link to="/illustration">See more illustrations</Link>
        </Styled.h5>
      </Flexbox>

      <Gallery size={"s"} imageEdges={insta} setLightbox={setLightbox} sx={{ mt: 2, mb: 4 }} />

      <Flexbox between middle>
        <Flexbox vertical>
          <Styled.h2 style={{ margin: 0 }}>Writing</Styled.h2>
          <Styled.h3>Some of My Thoughts and Explorations</Styled.h3>
        </Flexbox>
        <Styled.h5 sx={{ mx: 0, my: 0, textAlign: "right" }}>
          <Link to="/blog">See all articles</Link>
        </Styled.h5>
      </Flexbox>
      <div sx={{ variant: "collection.post" }}>
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
        <Dialog onClose={() => setLightbox(null)} onPrev={() => setDir("prev")} onNext={() => setDir("next")}>
          {selectedImage && <Img fluid={selectedImage.node.localImage.childImageSharp.fluid} />}
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
