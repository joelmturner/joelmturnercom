/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { memo, ReactNode } from "react";
import { FC } from "react";
import PostSeries from "./postSeries";
import Layout from "./layout";
import SEO from "./seo";
import Flexbox from "./flexbox";
import Link from "./link";
import { usePostSeries } from "../hooks";
import { slugify } from "../utils/utils";
import { PostNav } from "./postNav";

type PostNavProps = {
  frontmatter: {
    slug: string;
    title: string;
  };
};

type PostProps = {
  children: ReactNode | ReactNode[];
  excerpt: string;
  frontmatter: {
    title?: string;
    tags?: string[];
    category?: string;
    series?: string;
    order?: number;
    cover?: {
      publicURL: string;
    };
  };
  slug: string;
  pageContext: {
    postsInSeries?: { title: string; slug: string }[];
  };
  data: {
    previous?: PostNavProps;
    next?: PostNavProps;
  };
  body: any;
};

const Post: FC<PostProps> = ({
  frontmatter: { cover, title, tags, category = "", series = "", order = 0 } = {},
  children,
  excerpt,
  data: { previous, next } = {},
  slug,
}) => {
  const postsInSeries = usePostSeries(series);
  const siteBaseUrl = "https://joelmturner.com";

  return (
    <Layout sx={{ variant: "post" }}>
      <SEO title={title} description={excerpt} image={cover && cover.publicURL} />
      <Styled.h1>{title}</Styled.h1>
      <PostSeries series={series} order={order} postsInSeries={postsInSeries} />

      <article>{children}</article>

      <Flexbox vertical sx={{ mt: 4, borderTop: "1px solid", borderColor: "muted", py: 3 }}>
        {category && (
          <Flexbox gap={1}>
            <Styled.h6 sx={{ fontWeight: "normal" }}>Category</Styled.h6>
            <Link to={slugify(category, `/blog/category`)} sx={{ fontWeight: "normal", variant: "link" }}>
              <Styled.h6 sx={{ variant: "link" }}>{category}</Styled.h6>
            </Link>
          </Flexbox>
        )}

        {tags && (
          <Flexbox gap={1} sx={{ mb: 3 }}>
            <Styled.h6 sx={{ fontWeight: "normal" }}>Tags: </Styled.h6>
            {tags.map((tag) => (
              <Link key={tag} to={slugify(tag, `/blog/tag`)} sx={{ fontWeight: "normal", variant: "link" }}>
                <Styled.h6 sx={{ variant: "link" }}>{tag}</Styled.h6>
              </Link>
            ))}
          </Flexbox>
        )}

        <PostNav slug={slug} />
      </Flexbox>

      <Flexbox vertical gap right>
        <Styled.h6 sx={{ color: "gray" }}>
          Discuss this article on{" "}
          <Styled.a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://mobile.twitter.com/search?q=${encodeURI(siteBaseUrl + "/blog/" + slug)}`}
          >
            Twitter
          </Styled.a>
        </Styled.h6>
      </Flexbox>
    </Layout>
  );
};

export default memo(Post);
