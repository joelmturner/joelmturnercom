import { Grid, GridItem } from '@chakra-ui/react';
import { CldImage } from 'next-cloudinary';
import { memo, useCallback } from 'react';
import { useLightBoxContext } from '../../hooks/useLightBox';
import { Dialog } from '../Dialog';
import { cldImageStyles, COLUMNS_VS_DETAILS, SIZE_VS_DETAILS } from './constants';
import { GalleryProps } from './types';

function GridImage({ id, url, index, onClick, size = 'md' }) {
  const handleImageClick = useCallback(() => {
    onClick(index);
  }, [index, onClick]);

  return (
    <GridItem w="100%" h="100%" key={url}>
      <CldImage
        src={url}
        alt={id}
        width={SIZE_VS_DETAILS[size].px}
        height={SIZE_VS_DETAILS[size].px}
        onClick={handleImageClick}
        style={cldImageStyles}
        sizes="33vw, 50vw, 100vw"
        priority={index < SIZE_VS_DETAILS[size]}
      />
    </GridItem>
  );
}

const MemoizedGridImage = memo(GridImage);

export function Gallery({ images, columns = 3 }: GalleryProps) {
  const { lightbox, setLightbox } = useLightBoxContext();

  const handleCloseLightbox = useCallback(() => {
    setLightbox((prevState) => ({ ...prevState, index: -1 }));
  }, [setLightbox]);

  const handleClickImage = useCallback(
    (index: number) => {
      setLightbox((prevState) => ({ ...prevState, index }));
    },
    [setLightbox]
  );

  return (
    <>
      <Grid
        gap={2}
        w="full"
        templateColumns={COLUMNS_VS_DETAILS[columns].style}
        sx={{ containIntrinsicSize: '160px', contentVisibility: 'auto' }}
      >
        {images?.map(({ id, url }, index) => (
          <MemoizedGridImage
            key={id}
            id={id}
            url={url}
            index={index}
            onClick={handleClickImage}
            size={COLUMNS_VS_DETAILS[columns].size}
          />
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
