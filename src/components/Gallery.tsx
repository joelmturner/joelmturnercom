import { Grid, GridItem } from '@chakra-ui/react';
import { IllustrationItem } from '../lib/types';
import NextImage from 'next/image';
import { useCallback, useState } from 'react';
import { Dialog } from './Dialog';

type GalleryProps = { images: IllustrationItem[] };

function GridImage({ id, url, index, setLightboxOffset }) {
  const handleImageClick = useCallback(() => {
    setLightboxOffset(index);
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
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
      />
    </GridItem>
  );
}

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
        templateColumns={{ sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
        sx={{ containIntrinsicSize: '160px', contentVisibility: 'auto' }}
      >
        {images?.map(({ id, url }, index) => (
          <GridImage
            key={id}
            id={id}
            url={url}
            index={index}
            setLightboxOffset={setLightboxOffset}
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
