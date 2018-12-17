// @flow
import * as React from 'react'
import type { GraphQLSchema } from 'graphql'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { Section } from '../designSystem'
import { H1, H4 } from '../components/Text'
import Tabs from '../components/Tabs/Tabs'
import { TabContent } from '../components/Tabs/Tab'

type IllustrationProps = {
  data: any,
}
class Illustration extends React.Component<IllustrationProps> {
  render() {
    const { data } = this.props
    console.log('data', data)
    return (
      <Layout title="Illustration" slug="illustration">
        <Section title="Sketching">
          <H1>Sketching</H1>
          <H4>Handlettering and Illustration</H4>
          <Tabs>
            <TabContent data={data.inktober2017.edges} label="Inktober 2017" />
            <TabContent data={data.inktober2018.edges} label="Inktober 2018" />
            <TabContent data={data.letterClash.edges} label="Letter Clash">
              Letter Clash is Awesome
            </TabContent>
            <TabContent data={data.joelmturner_abcs2017.edges} label="Handlettered ABCs 2017" />
          </Tabs>
        </Section>
      </Layout>
    )
  }
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
              fluid(maxWidth: 1248) {
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
              fluid(maxWidth: 1248) {
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
              fluid(maxWidth: 1248) {
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
              fluid(maxWidth: 1248) {
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
