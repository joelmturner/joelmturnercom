/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Layout, Flexbox } from "../components"
import { ReactElement, Fragment } from "react"
import { Link } from "gatsby"

type PostProps = {
  title: string;
  children: ReactElement[];
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

export default ({ title, children, data: { previous, next } = {} }: PostProps): JSX.Element => (
  <Layout>
    <Styled.h1>{title}</Styled.h1>
    {children}
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
  </Layout>
)
