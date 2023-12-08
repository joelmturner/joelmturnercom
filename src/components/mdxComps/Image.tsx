'use client';

import { CldImage } from 'next-cloudinary';

export function Image({ src, alt, width, height }) {
  return (
    <CldImage
      width={width}
      height={height}
      src={src}
      alt={alt}
      sizes="(max-width: 480px) 100vw, 50vw"
    />
  );
}
