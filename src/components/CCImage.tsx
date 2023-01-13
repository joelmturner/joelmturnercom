import { chakra, ImageProps } from '@chakra-ui/react';
import { CldImage } from 'next-cloudinary';
import { ImageProps as NextImageProps } from 'next/image';

export const PostImage = chakra<'img', ImageProps & NextImageProps>(CldImage, {
  shouldForwardProp: (prop) =>
    ['width', 'height', 'src', 'alt', 'sizes', 'priority'].includes(prop),
});
