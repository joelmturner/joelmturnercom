// @flow
import React, { useState, type Node } from 'react'
import styled, { css } from 'styled-components'
import type { GraphQLSchema } from 'graphql'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Post from '../components/Post'
import { H1, H4, BodyText, ActionText } from '../components/Text'
import { Row, Flexbox, Section } from '../designSystem'
import { TabContent } from '../components/Tabs/Tab'
// import ContactForm from '../components/organisms/contact'
import { GridAlt } from 'styled-icons/boxicons-solid/GridAlt'
import { Grid } from 'styled-icons/boxicons-regular/Grid'
import { Square } from 'styled-icons/fa-solid/Square'
import Img from 'gatsby-image'
import Dialog from '../components/Dialog'
import { useLocalStorage, useLightbox } from '../hooks'
import { LinkText } from '../components/Text/Text'

type Edge = {
 node: {
  id: string,
  slug: string,
  status: string,
  template: string,
  format: string,
  title: string,
  content: string,
  excerpt: string,
  featured_media: {
   id: string,
   source_url: string,
  },
 },
}

type InstaEdge = {
 node: {
  id: string,
  localImage: {
   childImageSharp: Object,
  },
 },
}

type IndexProps = {
 data: {
  allWordpressPost: {
   edges: Edge[],
  },
  allInstagramContent: {
   edges: InstaEdge[],
  },
  site: {
   siteMetadata: {
    title: string,
    about: {
     name: string,
     title: string,
     bio: string,
    },
   },
  },
 },
}

type IndexState = {
 showAllPosts: boolean,
 togglePosts: () => void,
 sketchSize: 's' | 'm' | 'l',
 showAllSketches: boolean,
 toggleSketches: () => void,
}

const Avatar = styled.div`
      background-image: url('${({ url }) => url}');
      background-size: cover;
      border-radius: 50%;
      width: 4rem;
      height: 4rem;
      margin-right: 1rem;
  `
const styledIconShared = css`
 margin-left: 0.25em;
 fill: ${({ active, theme }) =>
  active ? theme.SizeIcons.active.color : theme.SizeIcons.default.color};
 color: ${({ active, theme }) =>
  active ? theme.SizeIcons.active.color : theme.SizeIcons.default.color};
 cursor: ${({ active }) => (active ? 'auto' : 'pointer')};
 transition: fill 300ms;
`
const StyledIconGrid = styled(Grid)`
 ${styledIconShared}
`
const StyledIconGridAlt = styled(GridAlt)`
 ${styledIconShared}
`
const StyledIconSquare = styled(Square)`
 ${styledIconShared}
`

function IndexPage({ data: { allWordpressPost, allInstagramContent, site } }: IndexProps) {
 const [lightbox, setLightbox] = useLightbox()
 const [showAllPosts, setShowAllPosts] = useLocalStorage('showAllPosts', false)
 const [showAllSketches, setShowAllSketches] = useLocalStorage('showAllSketches', false)
 const [sketchSize, setSketchSize] = useState('s')
 const { name, title } = site.siteMetadata.about

 const allPosts = allWordpressPost.edges
 const posts = showAllPosts ? allPosts : allPosts.slice(0, 6)

 const allSketches = allInstagramContent.edges
 const sketches = showAllSketches ? allSketches : allSketches.slice(0, 8)

 return (
  <Layout title="Howdy!">
   <Section title="About">
    <Flexbox style={{ marginTop: '1rem' }}>
     <Avatar url="https://res.cloudinary.com/joelmturner/image/upload/v1532201643/joel-turner-headshot-web_xyix1w.jpg" />
     <div>
      <H1>{name}</H1>
      <H4>{title}</H4>
     </div>
    </Flexbox>
    <BodyText>
     {
      "My background is in graphic design and web development. I'm currently working as a Front-End Developer at Sprinklr. I spend some of my free time exploring hand lettering and sketching as well as hiking in the Portland area with my wife and son."
     }
    </BodyText>
   </Section>

   <Section title="Sketching">
    <Flexbox between middle>
     <div>
      <H1>Sketching</H1>
      <H4>My Favorite Explorations</H4>
     </div>
     <Flexbox right>
      <StyledIconGrid active={sketchSize === 's'} onClick={() => setSketchSize('s')} size={24} />
      <StyledIconGridAlt active={sketchSize === 'm'} onClick={() => setSketchSize('m')} size={24} />
      <StyledIconSquare active={sketchSize === 'l'} onClick={() => setSketchSize('l')} size={24} />
     </Flexbox>
    </Flexbox>
    <TabContent
     data={sketches}
     label="Boop"
     size={sketchSize}
     onImageClick={setLightbox}
     style={{ marginBottom: '.5em' }}
    />
    <ActionText onClick={() => setShowAllSketches(!showAllSketches)}>
     {!showAllSketches ? 'Load More' : 'Show Fewer'} Favorites
    </ActionText>
   </Section>

   <Section title="Posts">
    <Flexbox vertical>
     <H1>Writing</H1>
     <H4>Some of My Thoughts and Explorations</H4>
    </Flexbox>
    <Row gap="1rem 4rem" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}>
     {posts &&
      posts.map(
       (post: Edge): Node => {
        const { id, title, slug, excerpt } = post.node
        const imageUrl = post.node.featured_media.source_url
        return <Post key={id} title={title} slug={slug} blurb={excerpt} imageSrc={imageUrl} />
       }
      )}
    </Row>
    <ActionText onClick={() => setShowAllPosts(!showAllPosts)}>
     {showAllPosts ? 'Show Fewer' : 'Load More'} Posts
    </ActionText>
   </Section>
   {lightbox.showLightbox && (
    <Dialog onClose={() => setLightbox(null)} maxWidth="700px">
     {lightbox.selectedImage && (
      <Img fluid={lightbox.selectedImage.node.localImage.childImageSharp.fluid} />
     )}
    </Dialog>
   )}
  </Layout>
 )
}

export default IndexPage

export const pageQuery: GraphQLSchema = graphql`
 query PageQuery {
  allWordpressPost(sort: { order: DESC, fields: date }) {
   edges {
    node {
     id
     date
     slug
     status
     template
     format
     title
     content
     excerpt
     featured_media {
      id
      source_url
     }
    }
   }
  }
  site {
   siteMetadata {
    title
    about {
     name
     title
     bio
    }
   }
  }
  allInstagramContent(
   filter: { tags: { eq: "joelmturner_featured" } }
   sort: { fields: created_time, order: ASC }
  ) {
   edges {
    node {
     id
     localImage {
      childImageSharp {
       fluid(maxWidth: 1248, maxHeight: 1248) {
        ...GatsbyImageSharpFluid_withWebp
       }
      }
     }
     images {
      standard_resolution {
       width
       height
       url
      }
     }
    }
   }
  }
 }
`
