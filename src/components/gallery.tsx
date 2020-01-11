/** @jsx jsx */
import { jsx } from "theme-ui"
import Img, { FluidObject } from "gatsby-image"
import { useKeyPress } from "../hooks"

export type GallerySizes = "s" | "m" | "l"
export type GalleryImage = {
  node: {
    localImage: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    id: string;
  };
}

type GalleryProps = {
  imageEdges: GalleryImage[];
  setLightbox: (edge: GalleryImage) => void;
  size: GallerySizes;
  className?: string;
}

function Gallery({ imageEdges, setLightbox, size, className }: GalleryProps) {
  const enter = useKeyPress("Enter");
  const spacebar = useKeyPress("Spacebar");
  function handleKeyPress(edge: GalleryImage) {
    if (enter || spacebar) {
      setLightbox(edge)
    }
  }
  return (
    <div sx={{ variant: `collection.image.${size}` }} className={className}>
      {imageEdges.length > 0 &&
        imageEdges.map((edge) => (
          <div
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
            key={edge.node.id}
            onKeyPress={() => handleKeyPress(edge)}
            onClick={() => setLightbox(edge)}
          >
            <Img fadeIn fluid={edge.node.localImage.childImageSharp.fluid} />
          </div>
        ))}
    </div>
  )
}

export default Gallery
