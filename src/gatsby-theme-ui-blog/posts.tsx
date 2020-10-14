/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { useState, useCallback, useEffect, useMemo } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Layout, SEO, Flexbox } from "../components"
import { FluidObject } from "gatsby-image"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { matchSorter } from "match-sorter"
import loadable from "@loadable/component"
import { useKeypress } from "../hooks"
import { FC } from "react"
const PostCard = loadable(() => import("../components/postCard"))

type IPosts = {
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
  allBlogPosts: IPosts;
  recentBlogPosts: IPosts;
}

type PostsProps = {
  pageContext: {
    isArchive: boolean;
    archiveType: "category" | "tag";
    archiveValue: string;
    newPath: string;
  };
}

const pageTitle = {
  default: "Blog",
  category: "Category",
  tag: "Tag",
}

const Posts: FC<PostsProps> = ({ pageContext, ...props }) => {
  console.log("props", props)
  const [search, setSearch] = useState<string>("")
  const esc = useKeypress("Escape")
  const data = useStaticQuery<Data>(graphql`
    query {
      ...allBlogPosts
      ...recentBlogPosts
    }
  `)
  const handleSearch = useCallback(
    function (event) {
      setSearch(event.target.value)
    },
    [setSearch]
  )
  const emptySearch = useCallback(
    function () {
      setSearch("")
    },
    [setSearch]
  )

  useEffect(() => {
    if (esc) {
      emptySearch()
    }
  }, [emptySearch, esc])

  const { allBlogPosts: { edges = [] } = {} } = data

  const filteredEdges: IPosts["edges"] = useMemo(() => {
    if (!pageContext?.isArchive) {
      return edges
    }

    const value = pageContext?.archiveValue.toLowerCase() ?? ""

    if (pageContext?.archiveType === "category") {
      return edges.filter((edge) => edge.node.frontmatter.category.toLowerCase() === value)
    } else if (pageContext?.archiveType === "tag") {
      return edges.filter((edge) => {
        const tags = edge.node.frontmatter.tags.map((tag) => tag.toLowerCase())
        return tags.includes(value)
      })
    }

    return edges
  }, [pageContext, edges])

  const posts: IPosts["edges"] = search
    ? matchSorter(filteredEdges, search, {
        keys: ["node.frontmatter.title", "node.frontmatter.category", "node.frontmatter.tags"],
      })
    : filteredEdges

  const title = pageContext?.isArchive
    ? `${pageTitle[pageContext.archiveType]}: ${pageContext.archiveValue}`
    : pageTitle.default
  return (
    <Layout>
      <SEO title="Blog" description="A journey through Gatsby, React, TypeScript, and illustration" />
      <Flexbox gap={3} between>
        <Styled.h1>{title}</Styled.h1>
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
      </Flexbox>
      <div sx={{ variant: "collection.post" }}>
        {posts.map((edge) => (
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
