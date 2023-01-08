import { Box, Flex, FormControl, FormLabel, IconButton, Select, VStack } from '@chakra-ui/react';
import { InferGetStaticPropsType } from 'next';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Gallery } from '../components/Gallery';
import { MDXComponents } from '../components/MDXComponents';
import SEO from '../components/SEO';
import { useLightBoxContext } from '../hooks/useLightBox';
import { ILLUSTRATION_FILTER_OPTIONS } from '../lib/constants';
import { getIllustrations } from '../lib/illustrations';
import { FaSquare } from 'react-icons/fa';
import { BsGridFill, BsFillGrid3X3GapFill } from 'react-icons/bs';

const MemoizedGallery = memo(Gallery);

function IllustrationPage({ images }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { lightbox, setLightbox } = useLightBoxContext();
  const [columns, setColumns] = useState(3);

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
          <Flex justifyContent="space-between" alignItems="center" gap={2}>
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
            <IconButton
              onClick={() => setColumns(1)}
              aria-label="Single Column"
              fontSize="20px"
              name="singleColumn"
              title="singleColumn"
              icon={<FaSquare />}
            />
            <IconButton
              onClick={() => setColumns(2)}
              aria-label="2 Columns"
              fontSize="20px"
              icon={<BsGridFill />}
            />
            <IconButton
              onClick={() => setColumns(3)}
              aria-label="3 Columns"
              fontSize="20px"
              icon={<BsFillGrid3X3GapFill />}
            />
          </Flex>
        </FormControl>
        <MemoizedGallery images={selectedImages} columns={columns} />
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
