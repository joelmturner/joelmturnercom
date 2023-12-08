'use client';

import { memo, useCallback } from 'react';
import { css } from 'styled-system/css';
import { CldImage } from 'next-cloudinary';
import { useLightBoxContext } from '../../hooks/useLightBox';
import { Lightbox } from '../Lightbox';
import { cldImageStyles, COLUMNS_VS_DETAILS, SIZE_VS_DETAILS } from './constants';
import { GalleryProps } from './types';
import { galleryGrid } from './galleryGrid';

function GridImage({ id, url, index, onClick, size = 'md' }) {
  const handleImageClick = useCallback(
    (event) => {
      event.preventDefault();
      onClick(index);
    },
    [index, onClick]
  );

  return (
    <div className={css({ w: 'full', h: 'full' })} key={url}>
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
    </div>
  );
}

const MemoizedGridImage = memo(GridImage);

function Gallery({ images, columns = 3 }: GalleryProps) {
  const { lightbox, setLightbox } = useLightBoxContext();

  const handleClickImage = useCallback(
    (index: number) => {
      setLightbox((prevState) => ({ ...prevState, index }));
    },
    [setLightbox]
  );

  return (
    <>
      <div className={galleryGrid({ cols: columns })}>
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
      </div>

      <Lightbox
        images={images}
        offset={lightbox.index}
        aria-label="Gallery of my sketches on Instagram"
      />
    </>
  );
}

const MemoizedGallery = memo(Gallery);
export { MemoizedGallery as Gallery };
