/** @jsx jsx */
import { jsx } from "theme-ui"
import { ReactElement } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Layout, PostCard, SEO } from "../components"
import { FluidObject } from "gatsby-image"

type Posts = {
  edges: Array<{
    node: {
      frontmatter: {
        title: string;
        cover: {
          childImageSharp: {
            fluid: FluidObject;
          };
        };
      };
      childMdxBlogPost: {
        excerpt: string;
        slug: string;
      };
    };
  }>;
}

type Data = {
  allBlogPosts: Posts;
  recentBlogPosts: Posts;
}

export default (): ReactElement => {
  const data = useStaticQuery<Data>(graphql`
    query {
      ...allBlogPosts
      ...recentBlogPosts
    }
  `)

  const { allBlogPosts: { edges = [] } = {} } = data
  return (
    <Layout>
      <SEO title="Blog" description="A journey through Gatsby, React, TypeScript, and illustration" />
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
