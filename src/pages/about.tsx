/** @jsx jsx */
import { jsx } from "theme-ui"
import AboutContent from "../../content/pages/about.md"
import SEO from "../components/seo"
import Layout from "../components/layout"

export default () => {
  return (
    <Layout>
      <SEO title="About" />
      <AboutContent />
    </Layout>
  )
}
