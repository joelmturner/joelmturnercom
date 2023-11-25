import { IllustrationItem } from '../../lib/types';

export type GalleryProps = {
  images: IllustrationItem[];
  lightBoxIndex?: number;
  columns?: 3 | 2 | 1;
};
