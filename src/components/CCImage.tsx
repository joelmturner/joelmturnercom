import { chakra, ImageProps } from '@chakra-ui/react';
import { CldImage } from 'next-cloudinary';
import { HtmlHTMLAttributes } from 'react';

export const PostImage = chakra<'img', ImageProps & HtmlHTMLAttributes<HTMLImageElement>>(
  CldImage,
  {
    shouldForwardProp: (prop) =>
      ['width', 'height', 'src', 'alt', 'sizes', 'loading'].includes(prop),
  }
);
