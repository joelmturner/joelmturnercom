/** @jsx jsx */
import { jsx } from "theme-ui"
import Gallery from "./gallery"
import { useLightboxNav } from "../hooks"
import { graphql, useStaticQuery } from "gatsby"
import Dialog from "./dialog"
import Img from "gatsby-image"
import { InstaCollections } from "../pages/illustration"

export default ({ collection }: { collection: InstaCollections }) => {
  const data = useStaticQuery(graphql`
    query {
      ...featuredInsta
      ...inktober2017
      ...inktober2018
      ...letterClash
      ...joelmturner_abcs2017
      ...insta2016
      ...recentInsta
    }
  `)
  const { [`${collection}`]: { edges = [] } = {} } = data

  const { showLightbox, setLightbox, selectedImage, setDir } = useLightboxNav(edges)
  return (
    <div sx={{ mt: 2 }}>
      <Gallery imageEdges={edges} setLightbox={setLightbox} size={"m"} />
      {showLightbox && (
        <Dialog onClose={() => setLightbox(null)} onPrev={() => setDir("prev")} onNext={() => setDir("next")}>
          {selectedImage && <Img fluid={selectedImage.node.localImage.childImageSharp.fluid} />}
        </Dialog>
      )}
    </div>
  )
}
