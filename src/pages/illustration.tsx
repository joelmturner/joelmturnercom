import { FormControl, FormLabel, Select, VStack } from '@chakra-ui/react';
import { InferGetStaticPropsType } from 'next';
import React, { memo, useCallback, useMemo } from 'react';
import { Gallery } from '../components/Gallery';
import { MDXComponents } from '../components/MDXComponents';
import SEO from '../components/SEO';
import { useLightBoxContext } from '../hooks/useLightBox';
import { ILLUSTRATION_FILTER_OPTIONS } from '../lib/constants';
import { getIllustrations } from '../lib/illustrations';

const MemoizedGallery = memo(Gallery);

function IllustrationPage({ images }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { lightbox, setLightbox } = useLightBoxContext();

  const selectedImages = useMemo(() => {
    return images[lightbox.collection];
  }, [lightbox.collection]);

  const handleChange = useCallback((selection: React.ChangeEvent<HTMLSelectElement>) => {
    setLightbox((prevState) => ({
      ...prevState,
      collection: selection.target.value,
    }));
  }, []);

  return (
    <>
      <SEO title="Illustrations" />
      <VStack alignItems="flex-start" gap={4}>
        <MDXComponents.h1>Explorations of Handlettering and Illustration</MDXComponents.h1>
        <FormControl>
          <FormLabel htmlFor="collection">Collection</FormLabel>
          <Select
            id="collection"
            placeholder="Select collection"
            value={lightbox.collection}
            onChange={handleChange}
          >
            {ILLUSTRATION_FILTER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormControl>
        <MemoizedGallery images={selectedImages} />
      </VStack>
    </>
  );
}

export default IllustrationPage;

export async function getStaticProps() {
  const images = await getIllustrations();
  return {
    props: {
      images,
    },
  };
}
