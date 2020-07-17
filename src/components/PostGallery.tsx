/** @jsx jsx */
import { jsx } from "theme-ui"
import Gallery from "./gallery"
import { graphql, useStaticQuery } from "gatsby"
import Dialog from "./dialog"
import { InstaCollections } from "../pages/illustration"
import { useCallback, useState } from "react"

type PostGalleryProps = { collection: InstaCollections }

const PostGallery: React.FC<PostGalleryProps> = ({ collection }) => {
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
  const [offset, setOffset] = useState(-1)
  const onClose = useCallback(
    function () {
      setOffset(-1)
    },
    [setOffset]
  )

  const { [`${collection}`]: { nodes = [] } = {} } = data
  const handleSetOffset = useCallback(
    (edge) => {
      setOffset(nodes.indexOf(edge))
    },
    [setOffset, nodes]
  )

  return (
    <div sx={{ mt: 2 }}>
      <Gallery imageEdges={nodes} setLightbox={handleSetOffset} size={"m"} />
      {offset > -1 && <Dialog imageEdges={nodes} offset={offset} onClose={onClose} />}
    </div>
  )
}

export default PostGallery
