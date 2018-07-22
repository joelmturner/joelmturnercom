import React, { Component } from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
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
                <li key={post.node.id}> 
                    <Link to={`/${post.node.slug}`}>{post.node.title}</Link> 
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
