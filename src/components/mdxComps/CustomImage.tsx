'use client';

import { useState, useEffect } from 'react';
import { useMeasure } from 'react-use';
import { isCloudinaryUrl } from 'src/utils/strings';
import { PostImage } from '../CCImage';
import NextImage from 'next/image';

export function CustomImage({
  src,
  alt = '',
  width = 630,
  height = 400,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  const [ref, { width: wrapWidth = 0 }] = useMeasure<HTMLDivElement>();
  const [imageDetails, setImageDetails] = useState({ width: 0, height: 0 });
  const srcSegments = src.split('/');
  const uploadIndex = srcSegments.indexOf('upload');
  // parameter to get image info
  srcSegments.splice(uploadIndex + 1, 0, 'fl_getinfo');
  const newSrc = srcSegments.join('/');

  useEffect(() => {
    async function getImageDetails() {
      const url = new URL(newSrc);
      const response = await fetch(url);
      const json = await response.json();
      setImageDetails(json.output);
    }
    if (isCloudinaryUrl(src)) {
      getImageDetails();
    }
  }, [newSrc, src]);

  const resolvedWidth = imageDetails.width ? Math.min(wrapWidth, imageDetails.width) : null;

  if (isCloudinaryUrl(src) && resolvedWidth) {
    return imageDetails.width && imageDetails.height ? (
      <div ref={ref} style={{ width: '100%' }}>
        <PostImage
          width={resolvedWidth}
          height={(resolvedWidth / imageDetails.width) * imageDetails.height}
          src={src}
          alt={alt}
          style={{ aspectRatio: `${imageDetails.width} / ${imageDetails.height}` }}
        />
      </div>
    ) : (
      <NextImage width={width} height={height} src={src} alt={alt} />
    );
  } else {
    return <NextImage width={width} height={height} src={src} alt={alt} />;
  }
}
