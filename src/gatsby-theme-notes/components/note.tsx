/** @jsx jsx */
import { jsx } from "theme-ui"
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
  ...props
}: any) => {
  const path = props.pageContext.parent.relativePath.match(/^.*\//gm)[0].replace("/", "")
  return (
    <Layout {...props} title={title}>
      <Flexbox noGrow gap={1} sx={{ mb: 3 }}>
        <Link sx={{ variant: "link", textDecoration: "none", fontWeight: 700 }} to={`/`}>
          {`~`}
        </Link>
        /
        <Link sx={{ variant: "link", textDecoration: "none", fontWeight: 700 }} to={`/notes`}>
          {`notes`}
        </Link>
        /
        <Link sx={{ variant: "link", textDecoration: "none", fontWeight: 700 }} to={`/notes/${path}`}>
          {`${path}`}
        </Link>
      </Flexbox>
      <MDXRenderer components={components}>{body}</MDXRenderer>
    </Layout>
  )
}

export default WikiPage
