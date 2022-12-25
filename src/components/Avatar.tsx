import { CldImage } from 'next-cloudinary';

const styles = {
  borderRadius: '50%',
};

type AvatarProps = { src: string; alt: string };

export function Avatar({ src, alt = 'joel m turner portrait' }: AvatarProps) {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={128}
      height={128}
      placeholder="blur"
      style={styles}
      crop="thumb"
      gravity="faces"
      zoom="0.5"
    />
  );
}
