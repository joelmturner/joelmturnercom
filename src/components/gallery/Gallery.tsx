import { Grid, GridItem } from '@chakra-ui/react';
import { CldImage } from 'next-cloudinary';
import { memo, useCallback, useMemo } from 'react';
import { useLightBoxContext } from '../../hooks/useLightBox';
import { Dialog } from '../Dialog';
import { COLUMNS_VS_SIZE, COLUMNS_VS_STYLES, SIZE_VS_PX } from './constants';
import { GalleryProps } from './types';

function GridImage({ id, url, index, onClick, size = 'md' }) {
  const handleImageClick = useCallback(() => {
    onClick(index);
  }, [index]);

  const styles = useMemo(
    () => ({
      cursor: 'pointer',
      objectFit: 'cover',
    }),
    []
  );

  return (
    <GridItem w="100%" h="100%" key={url}>
      <CldImage
        src={url}
        alt={id}
        width={SIZE_VS_PX[size]}
        height={SIZE_VS_PX[size]}
        onClick={handleImageClick}
        placeholder="blur"
        style={styles}
        sizes="33vw, 50vw, 100vw"
      />
    </GridItem>
  );
}

const MemoizedGridImage = memo(GridImage);

export function Gallery({ images, columns = 3 }: GalleryProps) {
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
        templateColumns={COLUMNS_VS_STYLES[columns]}
        sx={{ containIntrinsicSize: '160px', contentVisibility: 'auto' }}
      >
        {images?.map(({ id, url }, index) => (
          <MemoizedGridImage
            key={id}
            id={id}
            url={url}
            index={index}
            onClick={handleClickImage}
            size={COLUMNS_VS_SIZE[columns]}
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
