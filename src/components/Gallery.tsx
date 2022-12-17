import { Grid, GridItem } from '@chakra-ui/react';
import { CldImage } from 'next-cloudinary';
import { memo, useCallback, useMemo } from 'react';
import { useLightBoxContext } from '../hooks/useLightBox';
import { IllustrationItem } from '../lib/types';
import { Dialog } from './Dialog';

type GalleryProps = { images: IllustrationItem[]; lightBoxIndex?: number };

function GridImage({ id, url, index, onClick }) {
  const handleImageClick = useCallback(() => {
    onClick(index);
  }, [index]);

  const styles = useMemo(
    () => ({
      cursor: 'pointer',
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
    }),
    []
  );

  return (
    <GridItem w="100%" h="100%" key={url}>
      <CldImage
        src={url}
        alt={id}
        width={200}
        height={200}
        onClick={handleImageClick}
        placeholder="blur"
        sizes="404px"
        style={styles}
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
