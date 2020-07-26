import { graphql } from "gatsby"
import PostPage from "../components/post"

export default PostPage

export const query = graphql`
  query NewPostPageQuery($id: String!, $previousId: String, $nextId: String) {
    site {
      siteMetadata {
        title
        social {
          name
          url
        }
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt
      body
      frontmatter {
        category
        date(formatString: "MMMM DD, YYYY")
        draft
        slug
        tags
        title
        series
        order
        cover {
          publicURL
        }
      }
    }
    previous: mdx(id: { eq: $previousId }) {
      id
      excerpt
      frontmatter {
        slug
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
    next: mdx(id: { eq: $nextId }) {
      id
      excerpt
      frontmatter {
        slug
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
