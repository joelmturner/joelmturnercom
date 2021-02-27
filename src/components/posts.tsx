/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { useState, useCallback, useEffect, useMemo } from "react";
import { Layout, SEO, Flexbox } from "../components";
import { FluidObject } from "gatsby-image";
import { matchSorter } from "match-sorter";
import { useKeypress } from "../hooks";
import { FC } from "react";
import { PostsList } from "./PostsList";

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
      slug: string;
      excerpt: string;
    };
  }>;
};

type PostsProps = {
  pageContext: {
    isArchive: boolean;
    archiveType: "category" | "tag";
    archiveValue: string;
    newPath: string;
  };
  data: {
    allBlogPosts: IPosts;
    recentBlogPosts: IPosts;
  };
};

const pageTitle = {
  default: "Blog",
  category: "Category",
  tag: "Tag",
};

const Posts: FC<PostsProps> = ({ pageContext, data, ...props }) => {
  const [search, setSearch] = useState<string>("");
  const esc = useKeypress("Escape");

  const handleSearch = useCallback(
    function (event) {
      setSearch(event.target.value);
    },
    [setSearch]
  );
  const emptySearch = useCallback(
    function () {
      setSearch("");
    },
    [setSearch]
  );

  useEffect(() => {
    if (esc) {
      emptySearch();
    }
  }, [emptySearch, esc]);

  const { allBlogPosts: { edges = [] } = {} } = data;

  const filteredEdges: IPosts["edges"] = useMemo(() => {
    if (!pageContext?.isArchive) {
      return edges;
    }

    const value = pageContext?.archiveValue.toLowerCase() ?? "";

    if (pageContext?.archiveType === "category") {
      return edges.filter((edge) => edge.node.frontmatter.category.toLowerCase() === value);
    } else if (pageContext?.archiveType === "tag") {
      return edges.filter((edge) => {
        const tags = edge.node.frontmatter.tags.map((tag) => tag.toLowerCase());
        return tags.includes(value);
      });
    }

    return edges;
  }, [pageContext, edges]);

  const posts: IPosts["edges"] = useMemo(
    () =>
      search
        ? matchSorter(filteredEdges, search, {
            keys: ["node.frontmatter.title", "node.frontmatter.category", "node.frontmatter.tags"],
          })
        : filteredEdges,
    [search, filteredEdges]
  );

  const title = pageContext?.isArchive
    ? `${pageTitle[pageContext.archiveType]}: ${pageContext.archiveValue}`
    : pageTitle.default;

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

      <PostsList edges={posts} />
    </Layout>
  );
};

export default Posts;
