/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Layout, Flexbox, Grid, SEO } from "../components"
import { Fragment, ReactNode } from "react"
import { Link } from "gatsby"

type PostProps = {
  title: string;
  children: ReactNode | ReactNode[];
  uri: string;
  excerpt: string;
  data: {
    previous?: {
      slug: string;
      title: string;
    };
    next?: {
      slug: string;
      title: string;
    };
  };
}

export default ({ title, children, uri, excerpt, data: { previous, next } = {}, ...rest }: PostProps): JSX.Element => {
  const siteBaseUrl = "https://joelmturner.com"
  const twitterMessage = `${title} ${siteBaseUrl}${uri} via @joelmturner`
  return (
    <Layout>
      <SEO title={title} description={excerpt} />
      <Styled.h1>{title}</Styled.h1>
      {children}
      <Grid columns="1fr 1fr" gap="2">
        <Fragment>
          {previous && (
            <Flexbox left>
              <Styled.p>
                <Link sx={{ variant: "link" }} to={previous.slug}>{`<-- ${previous.title}`}</Link>
              </Styled.p>
            </Flexbox>
          )}
          {next && (
            <Flexbox right>
              <Styled.p>
                <Link sx={{ variant: "link" }} to={next.slug}>{`${next.title} -->`}</Link>
              </Styled.p>
            </Flexbox>
          )}
        </Fragment>
      </Grid>
      <Flexbox vertical gap right>
        <Styled.h6>
          Discuss this article on{" "}
          <Styled.a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://mobile.twitter.com/search?q=${encodeURI("https://joelmturer" + uri)}`}
          >
            Twitter
          </Styled.a>
        </Styled.h6>

        <Flexbox right>
          <Styled.h6>
            Share Article on{" "}
            <Styled.a
              className="twitter-share-button"
              href={`https://twitter.com/intent/tweet?text=${encodeURI(twitterMessage)}`}
            >
              Twitter
            </Styled.a>
          </Styled.h6>
        </Flexbox>
      </Flexbox>
    </Layout>
  )
}
