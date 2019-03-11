// @flow
import React, { useEffect } from 'react'
import Layout from '../components/layout'
import CodePen from '../helpers/CodePen'
import Prism from 'prismjs'
import { graphql } from 'gatsby'
import { H1 } from '../components/Text'
import '../helpers/prism.css'

function PostTemplate({ data }) {
 useEffect(() => {
  Prism.highlightAll()
 }, [])

 const post = data.wordpressPost

 return (
  <Layout title={post.title} slug={post.slug}>
   <CodePen />
   <H1>{post.title}</H1>
   <div dangerouslySetInnerHTML={{ __html: post.content }} />
  </Layout>
 )
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
