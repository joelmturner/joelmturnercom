import { ColorMode, Grid, GridItem, useColorMode } from '@chakra-ui/react';
import NextImage from 'next/image';
import { memo, useCallback } from 'react';
import { useLightBoxContext } from '../hooks/useLightBox';
import { IllustrationItem } from '../lib/types';
import { Dialog } from './Dialog';

type GalleryProps = { images: IllustrationItem[]; lightBoxIndex?: number };

const shimmer = (w: number, h: number, mode: ColorMode) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="${mode === 'dark' ? '#333' : '#ccc'}" offset="20%" />
      <stop stop-color="${mode === 'dark' ? '#222' : '#ddd'}" offset="50%" />
      <stop stop-color="${mode === 'dark' ? '#333' : '#ccc'}" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${mode === 'dark' ? '#333' : '#ccc'}" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

function GridImage({ id, url, index, onClick }) {
  const { colorMode } = useColorMode();

  const handleImageClick = useCallback(() => {
    onClick(index);
  }, [index]);

  return (
    <GridItem w="100%" h="100%" key={url}>
      <NextImage
        src={url}
        alt={id}
        objectFit="cover"
        width={200}
        height={200}
        layout="responsive"
        sizes="404px"
        onClick={handleImageClick}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(404, 404, colorMode))}`}
        style={{ cursor: 'pointer' }}
      />
    </GridItem>
  );
}

const MemoizedGridImage = memo(GridImage);

export function Gallery({ images }: GalleryProps) {
  const { lightbox, setLightbox } = useLightBoxContext();

  const handleCloseLightbox = useCallback(() => {
    setLightbox((prevState) => ({ ...prevState, index: -1 }));
  }, []);

  const handleClickImage = useCallback((index: number) => {
    setLightbox((prevState) => ({ ...prevState, index }));
  }, []);

  return (
    <>
      <Grid
        gap={2}
        w="full"
        templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        sx={{ containIntrinsicSize: '160px', contentVisibility: 'auto' }}
      >
        {images?.map(({ id, url }, index) => (
          <MemoizedGridImage key={id} id={id} url={url} index={index} onClick={handleClickImage} />
        ))}
      </Grid>

      {lightbox.index > -1 && (
        <Dialog
          images={images}
          offset={lightbox.index}
          onClose={handleCloseLightbox}
          aria-label="Gallery of my sketches on Instagram"
        />
      )}
    </>
  );
}
