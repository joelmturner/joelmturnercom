/** @jsx jsx */
import { jsx } from "theme-ui"
import { FluidObject } from "gatsby-image"
import { useKeypress } from "../hooks"
import { useCallback } from "react"
import loadable from '@loadable/component';
const Img = loadable(() => import('gatsby-image'));

export type GallerySizes = "s" | "m" | "l"
export type GalleryImage = {
    localFile: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    id: string;
}

type GalleryProps = {
  imageEdges: GalleryImage[];
  setLightbox: (edge: GalleryImage) => void;
  size: GallerySizes;
  className?: string;
}

function Gallery({ imageEdges, setLightbox, size, className }: GalleryProps) {
  const enter = useKeypress("Enter")
  const spacebar = useKeypress("Spacebar")
  const handleKeyPress = useCallback(
    function(edge) {
      if (enter || spacebar) {
        setLightbox(edge)
      }
    },
    [setLightbox, enter, spacebar]
  )

  const handleClick = useCallback(
    function(edge) {
      setLightbox(edge)
    },
    [setLightbox]
  )

  return (
    <div sx={{ variant: `collection.image.${size}` }} className={className}>
      {imageEdges.length > 0 &&
        imageEdges.map(node => {
          const fluid = node?.localFile?.childImageSharp.fluid ?? null
          return (
            <div
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer" }}
              key={node.id}
              onKeyPress={() => handleKeyPress(node)}
              onClick={() => handleClick(node)}
            >
              {fluid && <Img fadeIn fluid={node.localFile.childImageSharp.fluid} />}
            </div>
          )
        })}
    </div>
  )
}

export default Gallery
