import React, { Component } from 'react'
import Layout from '../components/layout'
import CodePen from '../helpers/CodePen'

class PostTemplate extends Component {
  render() {
    const post = this.props.data.wordpressPost

    return (
      <Layout title={post.title} slug={post.slug}>
        <CodePen />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query currentPostQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      slug
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
