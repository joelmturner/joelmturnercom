/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
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
    allInstagramContent: {
      edges: InstaNode[];
    };
    allMdx: {
      edges: MDXNode[];
    };
  };
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const [showInsta, setShowInsta] = React.useState(false)
  const [showPosts, setShowPosts] = React.useState(false)
  const [sketchSize, setSketchSize] = React.useState<GallerySizes>("s")

  const ref = React.useRef()
  const { allInstagramContent: { edges: instaEdges = [] } = {} } = data
  const { allMdx: { edges: mdxEdges = [] } = {} } = data
  let insta: InstaNode[] = []
  if (instaEdges.length > 0) {
    insta = showInsta ? instaEdges : instaEdges.slice(0, 6)
  }
  let posts: MDXNode[] = []
  if (mdxEdges.length > 0) {
    posts = showPosts ? mdxEdges : mdxEdges.slice(0, 2)
  }

  const { showLightbox, setLightbox, selectedImage, setDir } = useLightboxNav(insta)
  useOnClickOutside(ref, () => setLightbox(null))

  return (
    <Layout title="Howdy!">
      <SEO title="Home" />

      <div
        sx={{
          display: "grid",
          gridTemplateColumns: `5rem 1fr`,
        }}
      >
        <Avatar />
        <Flexbox vertical>
          <Styled.h1 style={{ margin: 0 }}>Joel M. Turner</Styled.h1>
          <Styled.h3>Frontend Developer</Styled.h3>
        </Flexbox>
      </div>
      <Styled.p>
        {
          "My background is in graphic design and web development. I'm currently working as a Front-End Developer at Sprinklr. I spend some of my free time exploring hand lettering and sketching as well as hiking in the Portland area with my wife and son."
        }
      </Styled.p>

      <Flexbox between middle>
        <Flexbox vertical>
          <Styled.h2>Sketching</Styled.h2>
          <Styled.h3>My Favorite Explorations</Styled.h3>
        </Flexbox>
        <Flexbox right>
          <FaTh
            sx={{ variant: sketchSize === "s" ? "icon.active" : "icon" }}
            onClick={() => setSketchSize("s")}
            size={24}
          />
          <FaThLarge
            sx={{ variant: sketchSize === "m" ? "icon.active" : "icon" }}
            onClick={() => setSketchSize("m")}
            size={24}
          />
          <FaSquare
            sx={{ variant: sketchSize === "l" ? "icon.active" : "icon" }}
            onClick={() => setSketchSize("l")}
            size={24}
          />
          {showInsta ? (
            <FaCaretUp
              sx={{ variant: sketchSize === "l" ? "icon.active" : "icon" }}
              onClick={() => setShowInsta(!showInsta)}
              size={24}
            />
          ) : (
            <FaCaretDown
              sx={{ variant: sketchSize === "l" ? "icon.active" : "icon" }}
              onClick={() => setShowInsta(!showInsta)}
              size={24}
            />
          )}
        </Flexbox>
      </Flexbox>

      <Gallery size={sketchSize} imageEdges={insta} setLightbox={setLightbox} />

      <Flexbox between middle>
        <Flexbox vertical>
          <Styled.h2>Writing</Styled.h2>
          <Styled.h3>Some of My Thoughts and Explorations</Styled.h3>
        </Flexbox>
        <Flexbox right>
          {showPosts ? (
            <FaCaretUp
              sx={{ variant: sketchSize === "l" ? "icon.active" : "icon" }}
              onClick={() => setShowPosts(!showPosts)}
              size={24}
            />
          ) : (
            <FaCaretDown
              sx={{ variant: sketchSize === "l" ? "icon.active" : "icon" }}
              onClick={() => setShowPosts(!showPosts)}
              size={24}
            />
          )}
        </Flexbox>
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
        <Dialog
          onClose={() => setLightbox(null)}
          maxWidth="700px"
          onPrev={() => setDir("prev")}
          onNext={() => setDir("next")}
        >
          {selectedImage && <Img fluid={selectedImage.node.localImage.childImageSharp.fluid} />}
        </Dialog>
      )}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query PageQuery {
    ...PostsEdges
    allInstagramContent(filter: { tags: { eq: "joelmturner_featured" } }, sort: { fields: created_time, order: ASC }) {
      edges {
        ...InstaNodes
      }
    }
  }
`
