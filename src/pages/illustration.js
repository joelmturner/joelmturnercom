// @flow
import React, { type Node, useState, useRef } from 'react'
import type { GraphQLSchema } from 'graphql'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { Section } from '../designSystem'
import { H1, H4, BodyText } from '../components/Text'
import Tabs from '../components/Tabs/Tabs'
import { TabContent } from '../components/Tabs/Tab'
import Dialog from '../components/Dialog'
import Img from 'gatsby-image'
import { useLightbox, useOnClickOutside } from '../hooks'

type IllustrationProps = {
 data: any,
}

function Illustration({ data }: IllustrationProps): Node {
 const [lightbox, setLightbox] = useLightbox()
 const ref = useRef()

 useOnClickOutside(ref, () => setLightbox(null))

 return (
  <Layout title="Illustration" slug="illustration">
   <Section title="Sketching">
    <H1>Sketching</H1>
    <H4>Handlettering and Illustration</H4>
    <Tabs>
     <TabContent data={data.inktober2017.edges} label="Inktober 2017" onImageClick={setLightbox} />
     <TabContent data={data.inktober2018.edges} label="Inktober 2018" onImageClick={setLightbox} />
     <TabContent data={data.letterClash.edges} label="Letter Clash" onImageClick={setLightbox}>
      <BodyText>
       {'Letter Clash was a collaboration between '}
       <a href="https://www.instagram.com/rttnbrgr/" rel="noopener noreferrer" target="_blank">
        @rttnbrgr
       </a>
       {
        ' and myself. Each week we would pick a topic/prompt and create a lettering piece. Checkout '
       }
       <a
        href="https://www.instagram.com/explore/tags/letterclash/"
        rel="noopener noreferrer"
        target="_blank">
        @letterclash
       </a>
       {' on Instagram.'}
      </BodyText>
     </TabContent>
     <TabContent
      data={data.joelmturner_abcs2017.edges}
      label="Handlettered ABCs 2017"
      onImageClick={setLightbox}
     />
    </Tabs>
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

export default Illustration
export const IllustrationPageQuery: GraphQLSchema = graphql`
 query IllustrationPageQuery {
  inktober2017: allInstagramContent(
   filter: { tags: { glob: "ink*2017" } }
   sort: { fields: created_time, order: ASC }
  ) {
   edges {
    node {
     id
     localImage {
      childImageSharp {
       fluid(maxWidth: 1248, maxHeight: 1248) {
        ...GatsbyImageSharpFluid
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
  inktober2018: allInstagramContent(
   filter: { tags: { glob: "ink*2018" } }
   sort: { fields: created_time, order: ASC }
  ) {
   edges {
    node {
     id
     localImage {
      childImageSharp {
       fluid(maxWidth: 1248, maxHeight: 1248) {
        ...GatsbyImageSharpFluid
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
  letterClash: allInstagramContent(
   filter: { tags: { eq: "letterclash" } }
   sort: { fields: created_time, order: ASC }
  ) {
   edges {
    node {
     id
     localImage {
      childImageSharp {
       fluid(maxWidth: 1248, maxHeight: 1248) {
        ...GatsbyImageSharpFluid
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
  joelmturner_abcs2017: allInstagramContent(
   filter: { tags: { glob: "j*2017" } }
   sort: { fields: created_time, order: ASC }
  ) {
   edges {
    node {
     id
     localImage {
      childImageSharp {
       fluid(maxWidth: 1248, maxHeight: 1248) {
        ...GatsbyImageSharpFluid
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
