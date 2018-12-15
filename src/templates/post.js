// @flow
import React, { Component } from 'react'
import Layout from '../components/layout'
import CodePen from '../helpers/CodePen'
import Prism from 'prismjs'
import { graphql } from 'gatsby'
import '../helpers/prism.css'
import { H1 } from '../components/Text'

class PostTemplate extends Component<any> {
  componentDidMount() {
    Prism.highlightAll()
  }
  render() {
    const post = this.props.data.wordpressPost

    return (
      <Layout title={post.title} slug={post.slug}>
        <CodePen />
        <H1>{post.title}</H1>
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
