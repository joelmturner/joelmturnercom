/** @jsx jsx */
import { jsx } from "theme-ui"
import Gallery from "./gallery"
import { useLightboxNav } from "../hooks"
import { graphql, useStaticQuery } from "gatsby"
import Dialog from "./dialog"
import Img from "gatsby-image"
import { InstaCollections } from "../pages/illustration"
import { useCallback } from "react"

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
  const { [`${collection}`]: { nodes = [] } = {} } = data
  const { showLightbox, setLightbox, selectedImage, setDir } = useLightboxNav(nodes)
  const onClose = useCallback(function() {
    setLightbox(null)
  }, [setLightbox])
  const onPrev = useCallback(function() {
      setDir('prev')
  }, [setDir])
  const onNext = useCallback(function() {
      setDir('next')
  }, [setDir])

  return (
    <div sx={{ mt: 2 }}>
      <Gallery imageEdges={nodes} setLightbox={setLightbox} size={"m"} />
      {showLightbox && (
        <Dialog onClose={onClose} onPrev={onPrev} onNext={onNext}>
          {selectedImage && <Img fluid={selectedImage.localFile.childImageSharp.fluid} />}
        </Dialog>
      )}
    </div>
  )
}
