/** @jsx jsx */
import { jsx } from "theme-ui"
import Gallery from "./gallery"
import { useLightboxNav } from "../hooks"
import { graphql, useStaticQuery } from "gatsby"
import Dialog from "./dialog"
import Img from "gatsby-image"

export default ({ recent = true }: { recent: boolean }) => {
  const data = useStaticQuery(graphql`
    query {
      insta2016: allInstagramContent(
        sort: { fields: created_time, order: DESC }
        filter: { created_time: { regex: "/(145|146|147|148)[0-9]+/g" }, tags: { glob: "handletteredabcs_2016" } }
      ) {
        edges {
          ...InstaNodes
        }
      }
      recent: allInstagramContent(sort: { fields: created_time, order: DESC }, limit: 18) {
        edges {
          ...InstaNodes
        }
      }
    }
  `)
  const { insta2016: { edges: edges2016 = [] } = {}, recent: { edges = [] } = {} } = data
  const posts = recent ? edges : edges2016
  const { showLightbox, setLightbox, selectedImage, setDir } = useLightboxNav(posts)
  return (
    <div sx={{ mt: 2 }}>
      <Gallery imageEdges={posts} setLightbox={setLightbox} size={"m"} />
      {showLightbox && (
        <Dialog
          onClose={() => setLightbox(null)}
          maxWidth="700px"
          onPrev={() => setDir("prev")}
          onNext={() => setDir("next")}
        >
          {selectedImage && <Img fluid={selectedImage.node.localImage.childImageSharp.fluid} />}
        </Dialog>
      )}
    </div>
  )
}
