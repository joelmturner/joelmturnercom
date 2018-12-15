// @flow
import React, { Component, type Node } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import type { GraphQLSchema } from 'graphql'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Post from '../components/Post'
import { H1, H4, BodyText, LinkText } from '../components/Text'
import { themes, Row, Flexbox } from '../designSystem'
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

const Section = styled.div`
  margin-bottom: 2.5rem;
`

const Avatar = styled.div`
      background-image: url('${({ url }) => url}');
      background-size: cover;
      border-radius: 50%;
      width: 4rem;
      height: 4rem;
  `

class IndexPage extends Component<IndexProps, IndexState> {
  state = {
    showAllPosts: false,
    togglePosts: () => {
      localStorage.setItem('showAllPosts', JSON.stringify(!this.state.showAllPosts))
      this.setState({
        showAllPosts: !this.state.showAllPosts,
      })
    },
  }

  componentDidMount() {
    if (!localStorage.getItem('showAllPosts')) {
      localStorage.setItem('showAllPosts', 'false')
    }

    const storage = localStorage.getItem('showAllPosts')
    const showAllPosts: boolean = storage === 'true' ? true : false
    if (this.state.showAllPosts !== showAllPosts) {
      this.setState({
        showAllPosts,
      })
    }
  }

  get posts(): Edge[] {
    const posts = this.props.data && this.props.data.allWordpressPost.edges
    return this.state.showAllPosts ? posts : posts.slice(0, 6)
  }

  render() {
    const data = this.props.data
    const { name, title } = data.site.siteMetadata.about
    const { showAllPosts, togglePosts } = this.state

    return (
      <ThemeProvider theme={themes.dark}>
        <Layout title="Joel M Turner" name="layout">
          {/* <ContactForm /> */}
          <Section title="About">
            <Flexbox>
              <Avatar
                size="l"
                url="https://res.cloudinary.com/joelmturner/image/upload/v1532201643/joel-turner-headshot-web_xyix1w.jpg"
              />
              <div>
                <H1>{name}</H1>
                <H4>{title}</H4>
              </div>
            </Flexbox>
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
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}>
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
    allWordpressPost(limit: 1000, sort: { order: DESC, fields: date }) {
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
  }
`
