import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'

class IndexPage extends Component {
  render() {
    const posts = this.props.data.allWordpressPost.edges
    const pages = this.props.data.allWordpressPage.edges

    return ( 
        <Layout title='Joel M Turner' > 
            <h2>Pages</h2> 
            {pages && pages.map(page => ( 
                <li key={page.node.id}> 
                    <Link to={`/${page.node.slug}`}>{page.node.title}</Link> 
                </li> 
            ))} 
            <h2>Posts</h2> 
            {posts && posts.map(post => ( 
                <li key={post.node.id} style={{display: 'flex', flexDirection: 'column', marginBottom: '2rem'}}> 
                    <Link to={`/${post.node.slug}`}>{post.node.title}</Link> 
                    { console.log('post.node', post.node) }
                    {post.node.featured_media && 
                        <img src={`${post.node.featured_media.source_url}`} />
                    }

                </li> 
            ))} 
        </Layout> 
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  {
    allWordpressPost {
      edges {
        node {
          id
          slug
          status
          template
          format
          title
          featured_media {
              id
              source_url
          }
        }
      }
    }
    allWordpressPage {
      edges {
        node {
          id
          slug
          status
          template
          title
        }
      }
    }
  }
`
