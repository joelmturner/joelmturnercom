/** @jsx jsx */
import { jsx } from "theme-ui"
import Img, { FluidObject } from "gatsby-image"

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
  return (
    <div sx={{ variant: `collection.image.${size}` }} className={className}>
      {imageEdges.length > 0 &&
        imageEdges.map(edge => (
          <div style={{ cursor: "pointer" }} key={edge.node.id} onClick={() => setLightbox(edge)}>
            <Img fadeIn fluid={edge.node.localImage.childImageSharp.fluid} />
          </div>
        ))}
    </div>
  )
}

export default Gallery
