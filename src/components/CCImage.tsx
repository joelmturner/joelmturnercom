import { chakra, ImageProps } from '@chakra-ui/react';
import { CldImage, CldImageProps } from 'next-cloudinary';

// this helps us use the chakra styles on the CldImage component
export const PostImage = chakra<React.ElementType<CldImageProps>, ImageProps & CldImageProps>(
  CldImage,
  {
    shouldForwardProp: (prop) =>
      ['width', 'height', 'src', 'alt', 'sizes', 'priority'].includes(prop),
  }
);
