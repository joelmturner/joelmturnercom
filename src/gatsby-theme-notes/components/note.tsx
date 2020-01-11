/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import components from "../../gatsby-plugin-theme-ui/components"
import Layout from "./layout"
import { Link } from "gatsby"
import { Flexbox } from "../../components"

const WikiPage = ({
  data: {
    note: { body },
    site: {
      siteMetadata: { title },
    },
  },
  path,
  pageContext: {
    parent: { name },
  },
  ...props
}: any) => {
  const route = path.substring(path.lastIndexOf("/notes/") + 7, path.lastIndexOf("/"))
  return (
    <Layout {...props} title={title}>
      <Flexbox noGrow gap={1} sx={{ mb: 3 }} middle role='navigation'>
        <Link sx={{ variant: "link", textDecoration: "none", fontWeight: 700 }} to={`/`}>
          ~
        </Link>
        /
        <Link sx={{ variant: "link", textDecoration: "none", fontWeight: 700 }} to={`/notes`}>
          notes
        </Link>
        /
        <Link sx={{ variant: "link", textDecoration: "none", fontWeight: 700 }} to={`/notes/${route}`}>
          {route}
        </Link>
        {"/"}
        <Styled.h4 sx={{ mb: 0, ml: 2 }}>{name}</Styled.h4>
      </Flexbox>
      <MDXRenderer components={components}>{body}</MDXRenderer>
    </Layout>
  )
}

export default WikiPage
