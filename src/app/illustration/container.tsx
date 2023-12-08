'use client';

import React, { memo, useCallback, useMemo, useState } from 'react';
import { Gallery } from '../../components/gallery';
import { useLightBoxContext } from '../../hooks/useLightBox';
import { ILLUSTRATION_FILTER_OPTIONS } from '~/lib/constants';
import { FaSquare } from 'react-icons/fa';
import { BsGridFill, BsFillGrid3X3GapFill } from 'react-icons/bs';
import { Heading } from 'src/components/Heading';
import { IconButton } from 'src/components/IconButton';
import { Select } from '../../components/Select';
import { Portal } from '@ark-ui/react';
import { Flex } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { GalleryProps } from 'src/components/gallery/types';
import { IconType } from 'react-icons/lib';

const COLUMNS_DETAILS: { label: string; columns: GalleryProps['columns']; icon: IconType }[] = [
  {
    label: 'Single Column',
    columns: 1,
    icon: FaSquare,
  },
  {
    label: '2 Columns',
    columns: 2,
    icon: BsGridFill,
  },
  {
    label: '3 Columns',
    columns: 3,
    icon: BsFillGrid3X3GapFill,
  },
];

function IllustrationPage({ images }) {
  const { lightbox, setLightbox } = useLightBoxContext();
  const [columns, setColumns] = useState<GalleryProps['columns']>(3);

  const selectedImages = useMemo(() => {
    return images[lightbox.collection];
  }, [images, lightbox.collection]);

  const handleChange = useCallback(
    (selection) => {
      setLightbox((prevState) => ({
        ...prevState,
        collection: selection.value[0],
      }));
    },
    [setLightbox]
  );

  return (
    <>
      <Flex direction="column" className={css({ alignItems: 'flex-start', gap: 4 })}>
        <Heading as="h1" textStyle="4xl">
          Explorations of Handlettering and Illustration
        </Heading>
        <Flex justify="space-between" className={css({ alignItems: 'center', gap: 2, w: 'full' })}>
          <Select.Root
            items={ILLUSTRATION_FILTER_OPTIONS}
            positioning={{ sameWidth: true }}
            width="full"
            onValueChange={handleChange}
            value={[lightbox.collection]}
          >
            <Select.Label>Collection</Select.Label>
            <Flex gap={2} alignItems="center" justify="space-between">
              <Select.Control w="full">
                <Select.Trigger>
                  <Select.ValueText placeholder="Select collection" />
                </Select.Trigger>
              </Select.Control>

              <Flex gap={2} alignItems="center" justify="flex-end">
                {COLUMNS_DETAILS.map(({ label, columns: cols, icon: Icon }) => (
                  <IconButton
                    key={label}
                    variant="ghost"
                    size="xl"
                    onClick={() => setColumns(cols)}
                    aria-label={label}
                    data-active={columns === cols}
                    transition="bg 0.2s ease-in-out"
                    css={{
                      '&[data-active="true"]': {
                        bg: 'bg.emphasized',
                      },
                    }}
                  >
                    <Icon />
                  </IconButton>
                ))}
              </Flex>
            </Flex>

            <Portal>
              <Select.Positioner>
                <Select.Content>
                  <Select.ItemGroup id="Collection">
                    <Select.ItemGroupLabel htmlFor="Collection">Collection</Select.ItemGroupLabel>
                    {ILLUSTRATION_FILTER_OPTIONS.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        <Select.ItemText>{item.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.ItemGroup>
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Flex>
        <Gallery images={selectedImages} columns={columns} />
      </Flex>
    </>
  );
}

export default IllustrationPage;

// export async function getStaticProps() {
//   const images = await getIllustrations();
//   return {
//     props: {
//       images,
//     },
//   };
// }
