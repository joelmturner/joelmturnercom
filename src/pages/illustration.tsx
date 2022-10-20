import { FormControl, FormLabel, Select, VStack } from '@chakra-ui/react';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Gallery } from '../components/Gallery';
import { MDXComponents } from '../components/MDXComponents';
import SEO from '../components/SEO';
import { ILLUSTRATION_FILTER_OPTIONS, ILLUSTRATION_QUERY_VS_FILTER } from '../lib/constants';
import { getIllustrations } from '../lib/illustrations';
import { IllustrationTag } from '../lib/types';

const MemoizedGallery = memo(Gallery);

function IllustrationPage({ images }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const initialCollection: IllustrationTag =
    ILLUSTRATION_QUERY_VS_FILTER[
      ((router.query.collection as IllustrationTag) ?? 'featured').toLowerCase()
    ];
  const [selection, setSelection] = useState<IllustrationTag>(initialCollection);

  useEffect(() => {
    setSelection(initialCollection);
  }, [initialCollection]);

  const selectedImages = useMemo(() => {
    return images[selection];
  }, [selection]);

  const handleChange = useCallback((selection: React.ChangeEvent<HTMLSelectElement>) => {
    setSelection(selection.target.value as IllustrationTag);
    router.query['collection'] = selection.target.value;
    router.push(router);
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
            value={selection}
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
