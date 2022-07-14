import { Grid, GridItem, useColorMode } from '@chakra-ui/react';
import { IllustrationItem } from '../lib/types';
import NextImage from 'next/image';
import { memo, useCallback, useState } from 'react';
import { Dialog } from './Dialog';

type GalleryProps = { images: IllustrationItem[] };

const shimmer = (w, h, mode) => `
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

const toBase64 = (str) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

function GridImage({ id, url, index, setLightboxOffset, height, width }) {
  const { colorMode } = useColorMode();
  console.log('colorMode', colorMode);
  const handleImageClick = useCallback(() => {
    setLightboxOffset(index);
  }, [index]);
  console.log('height, width', height, width);
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
  const [lightboxOffset, setLightboxOffset] = useState(-1);
  const handleCloseLightbox = useCallback(() => {
    setLightboxOffset(-1);
  }, []);

  return (
    <>
      <Grid
        gap={2}
        w="full"
        templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        sx={{ containIntrinsicSize: '160px', contentVisibility: 'auto' }}
      >
        {images?.map(({ id, url, height, width }, index) => (
          <MemoizedGridImage
            key={id}
            id={id}
            url={url}
            index={index}
            setLightboxOffset={setLightboxOffset}
            height={height}
            width={width}
          />
        ))}
      </Grid>

      {lightboxOffset > -1 && (
        <Dialog
          images={images}
          offset={lightboxOffset}
          onClose={handleCloseLightbox}
          aria-label="Gallery of my sketches on Instagram"
        />
      )}
    </>
  );
}
