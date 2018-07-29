//@flow
import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import Post from '../components/molecules/Post'
import Section from '../components/atoms/Section'
import { H1, H4, BodyText, LinkText } from '../components/atoms/Text'
import ContactForm from '../components/organisms/contact'
import type { GraphQLSchema } from 'graphql'

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

  render() {
    const data = this.props.data
    const { name, title } = data.site.siteMetadata.about
    const posts = this.props.data.allWordpressPost.edges

    const fakeBlurb =
      'Listicle aesthetic mixtape umami kombucha schlitz farm-to-table, street art organic crucifix truffaut chambray deep v fam pork belly. Four loko chillwave hexagon organic, narwhal single-origin coffee everyday carry disrupt vaporware humblebrag. Tofu cred venmo, health goth live-edge cronut air plant tumblr locavore meggings quinoa edison bulb kinfolk kale chips single-origin coffee. Keffiyeh gentrify authentic, franzen blog letterpress 8-bit tilde. Kale chips kogi cardigan DIY, man braid swag actually tbh palo santo portland chia.'

    const { showAllPosts, togglePosts } = this.state

    return (
      <Layout title="Joel M Turner" name="layout">
        {/* <ContactForm /> */}
        <Section title="About">
          <H1>{name}</H1>
          <H4>{title}</H4>
          <BodyText>
            Not to be confused with{' '}
            <a href="http://www.youtube.com/watch?v=hCCc8zWqvYA">
              Joel Turner, the rather talented, Australian beat-boxer
            </a>.
          </BodyText>
          <BodyText>
            I spent many of my summers living on glaciers in Alaska.Living in a remote camp with a
            bunch of other interesting people was great.You never know where the conversations will
            go and what kind of friends you’ll make.
          </BodyText>
          <BodyText>
            I received my BA with a graphic design emphasis in December of 2005. Most of my free
            time in college was spent playing in the Symphony Orchestra and playing basketball.
          </BodyText>
          <BodyText>
            I was born in Laramie, Wyoming.I now live with my wife, Suzanne Turner and our two dogs
            in Portland, Oregon.
          </BodyText>
          <LinkText to="#">get in touch</LinkText>
        </Section>

        <Section title="Posts">
          <H1>Writing</H1>
          <H4>Some Tagline Here</H4>
          {!!posts &&
            posts.slice(0, 3).map((post: Edge) => {
              const { id, title, slug, excerpt } = post.node
              const imageUrl = post.node.featured_media.source_url
              return <Post key={id} title={title} slug={slug} blurb={excerpt} imageSrc={imageUrl} />
            })}

          {showAllPosts &&
            posts.slice(3).map((post: Edge) => {
              const { id, title, slug, excerpt } = post.node
              const imageUrl = post.node.featured_media.source_url
              return <Post key={id} title={title} slug={slug} blurb={excerpt} imageSrc={imageUrl} />
            })}

          <LinkText jumbo onClick={togglePosts}>
            {showAllPosts ? 'Hide' : 'Show'} All Posts
          </LinkText>
        </Section>
      </Layout>
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
