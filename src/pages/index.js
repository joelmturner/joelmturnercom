// @flow
import React, { Component, type Node } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Post from '../components/molecules/Post'
import Section from '../components/atoms/Section'
import { H1, H4, BodyText, LinkText } from '../components/atoms/Text'
import theme from '../designSystem'
import { ThemeProvider } from 'styled-components'
import Row from '../components/Grid/Row'
import type { GraphQLSchema } from 'graphql'
// import ContactForm from '../components/organisms/contact'

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

type IndexProps = {
  data: {
    allWordpressPost: {
      edges: Edge[],
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
}

class IndexPage extends Component<IndexProps, IndexState> {
  state = {
    showAllPosts: false,
    togglePosts: () => {
      this.setState({
        showAllPosts: !this.state.showAllPosts,
      })
    },
  }

  get posts(): Edge[] {
    const posts = this.props.data && this.props.data.allWordpressPost.edges
    return this.state.showAllPosts ? posts : posts.slice(0, 4)
  }

  render() {
    const data = this.props.data
    const { name, title } = data.site.siteMetadata.about
    // const posts = data.allWordpressPost.edges
    const { showAllPosts, togglePosts } = this.state

    return (
      <ThemeProvider theme={theme}>
        <Layout title="Joel M Turner" name="layout">
          {/* <ContactForm /> */}
          <Section title="About">
            <H1>{name}</H1>
            <H4>{title}</H4>
            <BodyText>
              My background is in graphic design and web development. I'm currently working as a
              Front-End Developer at Sprinklr. I spend some of my free time exploring hand lettering
              and sketching as well as hiking in the Portland area with my wife and son.
            </BodyText>
            {/* <LinkText to="#">get in touch</LinkText> */}
          </Section>

          <Section title="Posts">
            <H1>Writing</H1>
            <H4>Some of My Thoughts and Explorations</H4>

            <Row
              gap="2rem 4rem"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(448px, 1fr))' }}>
              {this.posts &&
                this.posts.map(
                  (post: Edge): Node => {
                    const { id, title, slug, excerpt } = post.node
                    const imageUrl = post.node.featured_media.source_url
                    return (
                      <Post
                        key={id}
                        title={title}
                        slug={slug}
                        blurb={excerpt}
                        imageSrc={imageUrl}
                      />
                    )
                  }
                )}
            </Row>

            <LinkText to="#" isjumbo onClick={togglePosts}>
              {showAllPosts ? 'Hide' : 'Show'} All Posts
            </LinkText>
          </Section>
        </Layout>
      </ThemeProvider>
    )
  }
}

export default IndexPage

export const pageQuery: GraphQLSchema = graphql`
  query PageQuery {
    allWordpressPost {
      edges {
        node {
          id
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
  }
`
