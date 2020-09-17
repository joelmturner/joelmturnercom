/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import { Layout, Flexbox, Grid, SEO, Link } from "../components";
import { Fragment, ReactNode } from "react";
import PostSeries from "../components/postSeries";

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
    slug?: string;
    tags?: string[];
    category?: string;
    series?: string;
    order?: number;
    cover?: {
      publicURL: string;
    };
  };
  pageContext: {
    postsInSeries?: { title: string; slug: string }[];
  };
  data: {
    previous?: PostNavProps;
    next?: PostNavProps;
  };
};

const Post: React.FC<PostProps> = ({
  frontmatter: { cover, slug, title, tags, category = "", series = "", order = 0 } = {},
  children,
  excerpt,
  data: { previous, next } = {},
  pageContext: { postsInSeries = [] },
  ...props
}) => {
  console.log("series", series);
  console.log("order", order);
  console.log("props", props);
  const siteBaseUrl = "https://joelmturner.com";
  return (
    <Layout sx={{ variant: "post" }}>
      <SEO title={title} description={excerpt} image={cover && cover.publicURL} />
      <Styled.h1>{title}</Styled.h1>

      <PostSeries series={series} order={order} postsInSeries={postsInSeries} />

      {children}

      <Flexbox vertical sx={{ mt: 4, borderTop: "1px solid", borderColor: "muted", py: 3 }}>
        {category && (
          <Flexbox gap={1}>
            <Styled.h6 sx={{ fontWeight: "normal" }}>Category</Styled.h6>
            <Link to={`/blog/category/${category.toLowerCase()}`} sx={{ fontWeight: "normal", variant: "link" }}>
              <Styled.h6 sx={{ variant: "link" }}>{category}</Styled.h6>
            </Link>
          </Flexbox>
        )}

        {tags && (
          <Flexbox gap={1} sx={{ mb: 3 }}>
            <Styled.h6 sx={{ fontWeight: "normal" }}>Tags: </Styled.h6>
            {tags.map((tag) => (
              <Link key={tag} to={`/blog/tag/${tag.toLowerCase()}`} sx={{ fontWeight: "normal", variant: "link" }}>
                <Styled.h6 sx={{ variant: "link" }}>{tag}</Styled.h6>
              </Link>
            ))}
          </Flexbox>
        )}

        <Grid columns="1fr 1fr" gap={2}>
          <Fragment>
            {previous && (
              <Flexbox left>
                <Styled.p>
                  <Link to={`/blog/${previous.frontmatter.slug}`}>{`<-- ${previous.frontmatter.title}`}</Link>
                </Styled.p>
              </Flexbox>
            )}
            {next && (
              <Flexbox right>
                <Styled.p>
                  <Link to={`/blog/${next.frontmatter.slug}`}>{`${next.frontmatter.title} -->`}</Link>
                </Styled.p>
              </Flexbox>
            )}
          </Fragment>
        </Grid>
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

export default Post;
