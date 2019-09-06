/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { ReactElement } from "react"
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
    <Styled.root>
      <Header siteTitle={title ? title : data.site.siteMetadata.title} />
      <div sx={{ variant: "content.wrapper" }}>
        <main>{children}</main>
        <footer sx={{ mt: 3, borderTop: "1px solid", borderColor: "muted", py: 4 }}>
          © 2012-{new Date().getFullYear()}, Proudly built with
          {` `}
          <Styled.a href="https://www.gatsbyjs.org">Gatsby</Styled.a> and{" "}
          <Styled.a href="https://theme-ui.com">Theme UI</Styled.a>
        </footer>
      </div>
    </Styled.root>
  )
}
