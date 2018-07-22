import React, {Component} from "react"
import Layout from "../components/layout";
import { graphql } from "gatsby";

class PageTemplate extends Component {
    render() {
        const currentPage = this.props.data.wordpressPage

        console.log(currentPage)

        return (
            <Layout title={currentPage.title} slug={currentPage.slug}> 
                <div dangerouslySetInnerHTML={{__html: currentPage.content}}/>
            </Layout>
        )
    }
}

export default PageTemplate;

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