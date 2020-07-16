/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState, useCallback } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Layout, SEO, Flexbox } from "../components"
import { FluidObject } from "gatsby-image"
import matchSorter from "match-sorter"
import loadable from '@loadable/component';
const PostCard = loadable(() => import('../components/postCard'));

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
        category: string;
        tags: string[];
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

type PostsProps = {};

const Posts: React.FC<PostsProps> = () => {
  const [search, setSearch] = useState<string>("")
  const data = useStaticQuery<Data>(graphql`
    query {
      ...allBlogPosts
      ...recentBlogPosts
    }
  `)
  const handleSearch = useCallback(
    function(event) {
      setSearch(event.target.value)
    },
    [setSearch]
  )
  const emptySearch = useCallback(
    function() {
      setSearch("")
    },
    [setSearch]
  )

  const { allBlogPosts: { edges = [] } = {} } = data

  const posts = search
    ? matchSorter(edges, search, {
        keys: ["node.frontmatter.title", "node.frontmatter.category", "node.frontmatter.tags"],
      })
    : edges

  return (
    <Layout>
      <SEO title="Blog" description="A journey through Gatsby, React, TypeScript, and illustration" />
      <Flexbox right gap={2} middle sx={{ mb: 3 }}>
        <input
          onChange={handleSearch}
          placeholder="Search..."
          value={search}
          sx={{
            p: 1,
            color: "textMuted",
            borderColor: "muted",
            borderWidth: 0,
            borderBottomWidth: 2,
            fontSize: 2,
            background: "transparent",
          }}
        />
        <Styled.p
          onClick={emptySearch}
          sx={{
            m: 0,
            ml: "-1rem",
            color: "textMuted",
            visibility: search ? "visible" : "hidden",
            transition: "visibility 150ms",
            cursor: "pointer",
            pb: 1,
          }}
        >
          x
        </Styled.p>
      </Flexbox>
      <div sx={{ variant: "collection.post" }}>
        {posts.map(edge => (
                <PostCard
                  key={`${edge.node.childMdxBlogPost.slug}`}
                  slug={`${edge.node.childMdxBlogPost.slug}`}
                  title={edge.node.frontmatter.title}
                  image={edge.node.frontmatter.cover && edge.node.frontmatter.cover.childImageSharp.fluid}
                  excerpt={edge.node.childMdxBlogPost.excerpt}
                />

        ))}
      </div>
    </Layout>
  )
}

export default Posts