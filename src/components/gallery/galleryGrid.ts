import { cva } from 'styled-system/css';

export const galleryGrid = cva({
  base: {
    display: 'grid',
    gap: 2,
    w: 'full',
    containIntrinsicSize: '160px',
    contentVisibility: 'auto',
  },
  variants: {
    cols: {
      3: { gridTemplateColumns: 'repeat(3, 1fr)' },
      2: { gridTemplateColumns: 'repeat(2, 1fr)' },
      1: { gridTemplateColumns: 'repeat(1, minmax(200px, 1fr))' },
    },
  },
});
