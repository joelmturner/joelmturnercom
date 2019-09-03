import * as React from "react"
/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
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
  setLightbox: (edge: any) => void;
  size: GallerySizes;
  className?: string;
}
export default ({ imageEdges, setLightbox, size, className }: GalleryProps) => {
  return (
    <div sx={{ variant: `collection.image.${size}`, mb: 4 }} className={className}>
      {imageEdges.length > 0 &&
        imageEdges.map(edge => (
          <div style={{ cursor: "pointer" }} key={edge.node.id} onClick={() => setLightbox(edge)}>
            <Img fadeIn fluid={edge.node.localImage.childImageSharp.fluid} />
          </div>
        ))}
    </div>
  )
}
