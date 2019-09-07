/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Layout from "../components/layout"
import { ReactElement, Fragment } from "react"
import Flexbox from "../components/flexbox"
import { Link } from "gatsby"

export default ({
  title,
  children,
  data: { previous = null, next = null } = {},
}: {
  title: string;
  children: ReactElement[];
}): JSX.Element => (
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
