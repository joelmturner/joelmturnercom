/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Layout from "../components/layout"
import { ReactElement } from "react"
import PostCard from "../components/postCard"
import { graphql, useStaticQuery } from "gatsby"

export default (props): ReactElement => {
  const data = useStaticQuery(graphql`
    query {
      ...PostsEdges
    }
  `)

  const { allMdx: { edges: mdxEdges = [] } = {} } = data
  return (
    <Layout>
      <div sx={{ variant: "collection.post" }}>
        {mdxEdges &&
          mdxEdges.map(edge => (
            <PostCard
              key={edge.node.frontmatter.title}
              slug={`${edge.node.childMdxBlogPost.slug}`}
              title={edge.node.frontmatter.title}
              image={
                edge.node.frontmatter.cover &&
                edge.node.frontmatter.cover.childImageSharp.fluid
              }
            />
          ))}
      </div>
    </Layout>
  )
}

export const postsFragment = graphql`
  fragment PostsEdges on Query {
    allMdx(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            cover {
              childImageSharp {
                fluid(maxWidth: 472, maxHeight: 300) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          childMdxBlogPost {
            excerpt(pruneLength: 150)
            slug
          }
        }
      }
    }
  }
`
