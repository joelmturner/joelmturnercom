/** @jsx jsx */
import { jsx } from "theme-ui"
import Layout from "../components/layout"
import { ReactElement } from "react"
import PostCard from "../components/postCard"
import { graphql, useStaticQuery } from "gatsby"

export default (): ReactElement => {
  const data = useStaticQuery(graphql`
    query {
      ...allBlogPosts
      ...recentBlogPosts
    }
  `)

  const { allBlogPosts: { edges = [] } = {} } = data
  return (
    <Layout>
      <div sx={{ variant: "collection.post" }}>
        {edges &&
          edges.map(edge => (
            <PostCard
              key={`${edge.node.childMdxBlogPost.slug}`}
              slug={`${edge.node.childMdxBlogPost.slug}`}
              title={edge.node.frontmatter.title}
              image={edge.node.frontmatter.cover && edge.node.frontmatter.cover.childImageSharp.fluid}
            />
          ))}
      </div>
    </Layout>
  )
}
