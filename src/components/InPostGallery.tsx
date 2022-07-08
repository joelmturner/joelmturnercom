import { useEffect, useState } from 'react';
import { getIllustrations } from '../lib/illustrations';
import { IllustrationTag } from '../lib/types';
import { Gallery } from './Gallery';
import { IllustrationItem } from '../../.vscode/.history/joelmturner/src/lib/types_20220707220852';

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
