'use client';

import { CldImage, CldImageProps } from 'next-cloudinary';
import { css } from '../../styled-system/css';
import { HTMLStyledProps, styled } from '../../styled-system/jsx';

const StyledImage = styled(
  CldImage,
  {},
  {
    shouldForwardProp: (prop) =>
      [
        'width',
        'height',
        'src',
        'alt',
        'sizes',
        'priority',
        'gravity',
        'crop',
        'aspectRatio',
      ].includes(prop),
  }
);

// this helps us use the panda styles on the CldImage component
export function PostImage({
  width = 400,
  height,
  src,
  alt,
  sizes,
  priority,
  gravity,
  crop,
  style,
  ...rest
}: CldImageProps & HTMLStyledProps<'img'>) {
  return (
    <StyledImage
      {...{ width, height, src, alt, sizes, priority, gravity, crop }}
      className={css(rest as any)}
      style={{ ...style }}
    />
  );
}
