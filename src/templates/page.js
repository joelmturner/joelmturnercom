// @flow
import React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'

function PageTemplate({ data }) {
 const currentPage = data.wordpressPage

 return (
  <Layout title={currentPage.title} slug={currentPage.slug}>
   <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
  </Layout>
 )
}

export default PageTemplate

export const pageQuery = graphql`
 query currentPageQuery($id: String!) {
  wordpressPage(id: { eq: $id }) {
   title
   content
   slug
  }
  site {
   id
   siteMetadata {
    title
   }
  }
 }
`
