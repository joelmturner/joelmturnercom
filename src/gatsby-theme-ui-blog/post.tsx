/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Layout, Flexbox, Grid, SEO } from "../components"
import { Fragment, ReactNode } from "react"
import { Link } from "gatsby"

type PostNavProps = {
  frontmatter: {
    slug: string;
    title: string;
  };
}

type PostProps = {
  children: ReactNode | ReactNode[];
  excerpt: string;
  frontmatter: {
    title?: string;
    slug?: string;
    tags?: string[];
    category?: string;
    cover?: {
      publicURL: string;
    };
  };
  data: {
    previous?: PostNavProps;
    next?: PostNavProps;
  };
}

const Post: React.FC<PostProps> = ({
  frontmatter: { cover, slug, title, tags, category = "" } = {},
  children,
  excerpt,
  data: { previous, next } = {},
}) => {
  const siteBaseUrl = "https://joelmturner.com"
  return (
    <Layout sx={{ variant: "post" }}>
      <SEO title={title} description={excerpt} image={cover && cover.publicURL} />
      <Styled.h1>{title}</Styled.h1>

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

        {tags && <Flexbox gap={1} sx={{ mb: 3 }}>
          <Styled.h6 sx={{ fontWeight: "normal" }}>Tags: </Styled.h6>
          {tags.map((tag) => (
              <Link key={tag} to={`/blog/tag/${tag.toLowerCase()}`} sx={{ fontWeight: "normal", variant: "link" }}>
                <Styled.h6 sx={{ variant: "link" }}>{tag}</Styled.h6>
              </Link>
            ))}
        </Flexbox>}

        <Grid columns="1fr 1fr" gap={2}>
          <Fragment>
            {previous && (
              <Flexbox left>
                <Styled.p>
                  <Link
                    sx={{ variant: "link" }}
                    to={`/blog/${previous.frontmatter.slug}`}
                  >{`<-- ${previous.frontmatter.title}`}</Link>
                </Styled.p>
              </Flexbox>
            )}
            {next && (
              <Flexbox right>
                <Styled.p>
                  <Link
                    sx={{ variant: "link" }}
                    to={`/blog/${next.frontmatter.slug}`}
                  >{`${next.frontmatter.title} -->`}</Link>
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
  )
}

export default Post
