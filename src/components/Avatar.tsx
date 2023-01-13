import { CldImage } from 'next-cloudinary';

const AVATAR_SIZE = 220;

const styles = {
  borderRadius: '50%',
};

type AvatarProps = { src: string; alt: string };

export function Avatar({ src, alt = 'joel m turner portrait' }: AvatarProps) {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={AVATAR_SIZE}
      height={AVATAR_SIZE}
      placeholder="blur"
      style={styles}
      zoom="0.5"
      sizes="(max-width: 480px) 30vw, 10vw"
      crop="thumb"
      gravity="faces"
    />
  );
}
