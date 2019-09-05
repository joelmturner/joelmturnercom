/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Fragment, ReactElement } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"

export default ({ children, title = "" }): ReactElement => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Fragment>
      <Header siteTitle={title ? title : data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer sx={{ mt: 4 }}>
          © 2012-{new Date().getFullYear()}, Proudly built with
          {` `}
          <Styled.a href="https://www.gatsbyjs.org">Gatsby</Styled.a> and{" "}
          <Styled.a href="https://theme-ui.com">Theme UI</Styled.a>
        </footer>
      </div>
    </Fragment>
  )
}
