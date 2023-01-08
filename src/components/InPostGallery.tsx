import { useEffect, useState } from 'react';
import { getIllustrations } from '../lib/illustrations';
import { IllustrationItem, IllustrationTag } from '../lib/types';
import { Gallery } from './gallery';

type InPostGalleryProps = { collection: IllustrationTag };

export function InPostGallery({ collection }: InPostGalleryProps) {
  const [filteredImages, setFilteredImages] = useState<IllustrationItem[]>([]);

  useEffect(() => {
    async function fetchImages() {
      const images = await getIllustrations();
      setFilteredImages(images[collection]);
    }

    fetchImages().catch(console.error);
  }, [collection]);

  return <Gallery images={filteredImages} />;
}
