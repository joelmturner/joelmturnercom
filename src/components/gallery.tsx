/** @jsx jsx */
import { memo, ReactElement, useCallback } from "react";
import { jsx } from "theme-ui";
import { useKeypress } from "../hooks";

const GalleryImage = memo(
  ({
    node,
    index,
    onKeyPress,
    onClick,
  }: {
    node: GalleryImage;
    index: number;
    onKeyPress: (node: GalleryImage) => void;
    onClick: (node: GalleryImage) => void;
  }): ReactElement | null => {
    const handleKeyPress = useCallback(() => {
      if (onKeyPress) {
        onKeyPress(node);
      }
    }, []);

    const handleClick = useCallback(() => {
      if (onClick) {
        onClick(node);
      }
    }, []);
    if (!node) {
      return null;
    }

    // const fluid = node?.localFile?.childImageSharp?.thumb ?? null;
    const src = node?.secure_url;
    return (
      <div
        role="button"
        aria-label={`image ${index + 1}`}
        tabIndex={0}
        style={{ cursor: "pointer" }}
        onKeyPress={handleKeyPress}
        onClick={handleClick}
      >
        <img loading="lazy" src={src} alt={`image ${index + 1}`} style={{ maxWidth: "100%" }} />
      </div>
    );
  }
);

export type GallerySizes = "s" | "m" | "l";
export type GalleryImage = {
  secure_url: string;
  id: string;
};

type GalleryProps = {
  imageEdges: GalleryImage[];
  setLightbox: (edge: GalleryImage) => void;
  size: GallerySizes;
  className?: string;
};

function Gallery({ imageEdges, setLightbox, size, className }: GalleryProps) {
  const enter = useKeypress("Enter");
  const spacebar = useKeypress("Spacebar");
  const handleKeyPress = useCallback(
    function (edge) {
      if (enter || spacebar) {
        setLightbox(edge);
      }
    },
    [setLightbox, enter, spacebar]
  );

  const handleClick = useCallback(
    function (edge) {
      setLightbox(edge);
    },
    [setLightbox]
  );

  return (
    <div sx={{ variant: `collection.image.${size}` }} className={className}>
      {imageEdges?.map((node, index) => (
        <GalleryImage
          key={node.id + index}
          node={node}
          index={index}
          onKeyPress={handleKeyPress}
          onClick={handleClick}
        />
      ))}
    </div>
  );
}

export default memo(Gallery);
