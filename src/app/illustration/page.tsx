import { getIllustrations } from 'src/lib/illustrations';
import IllustrationContainer from './container';
import { Metadata } from 'next';

export default async function IllustrationPage() {
  const images = await getIllustrations();

  return <IllustrationContainer images={images} />;
}

export const metadata: Metadata = {
  title: 'Illustration',
  description: 'Some of my favorite hand-drawn illustrations',
};
