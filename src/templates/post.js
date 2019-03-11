// @flow
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import Prism from 'prismjs'
import { graphql } from 'gatsby'
import { H1 } from '../components/Text'
import { useScript } from '../hooks'
import PrismStyles from '../designSystem/prismStyles'

const StyledPost = styled.div`
 ${PrismStyles};
`

function PostTemplate({ data }) {
 useEffect(() => {
  Prism.highlightAll()
 }, [])
 const [loaded, error] = useScript('//production-assets.codepen.io/assets/embed/ei.js')
 const post = data.wordpressPost

 return (
  <Layout title={post.title} slug={post.slug}>
   <H1>{post.title}</H1>
   <StyledPost dangerouslySetInnerHTML={{ __html: post.content }} />
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
