import React, { useCallback, useMemo, useState } from "react";
import { MDXComponents } from "../components/MDXComponents";
import { chakra, FormControl, FormLabel, Grid, GridItem, Select, VStack } from "@chakra-ui/react";
import { getIllustrations } from "../lib/illustrations";
import { ChakraNextImage } from "../components/ChakraNextImage";
import { Illustrations, IllustrationTag } from "../lib/types";
import { ILLUSTRATION_FILTER_OPTIONS } from "../lib/constants";
import { Dialog } from "../components/Dialog";
import Head from "next/head";
import NextImage from "next/image";
import SEO from "../components/SEO";

function GridImage({ id, url, index, setLightboxOffset }) {
  const handleImageClick = useCallback((index) => {
    setLightboxOffset(index);
  }, []);
  return (
    <GridItem w="100%" h="100%" key={url}>
      <NextImage
        src={url}
        alt={id}
        objectFit="cover"
        width={200}
        height={200}
        layout="responsive"
        onClick={() => handleImageClick(index)}
        style={{ cursor: "pointer" }}
      />
    </GridItem>
  );
}

type IllustrationPageProps = {
  images: Illustrations;
};

function IllustrationPage({ images }: IllustrationPageProps) {
  const [selection, setSelection] = useState<IllustrationTag>("joelmturner_featured");
  const [lightboxOffset, setLightboxOffset] = useState(-1);

  const selectedImages = useMemo(() => {
    return images[selection];
  }, [selection]);

  const handleChange = useCallback((selection: React.ChangeEvent<HTMLSelectElement>) => {
    setSelection(selection.target.value as IllustrationTag);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxOffset(-1);
  }, []);

  return (
    <>
      <SEO title="Illustrations" />
      <VStack alignItems="flex-start" gap={4}>
        <MDXComponents.h1>Explorations of Handlettering and Illustration</MDXComponents.h1>
        <FormControl>
          <FormLabel htmlFor="collection">Collection</FormLabel>
          <Select id="collection" placeholder="Select collection" value={selection} onChange={handleChange}>
            {ILLUSTRATION_FILTER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormControl>
        <Grid
          gap={2}
          w="full"
          templateColumns={{ sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
          sx={{ containIntrinsicSize: "160px", contentVisibility: "auto" }}
        >
          {selectedImages?.map(({ id, url }, index) => (
            <GridImage key={id} id={id} url={url} index={index} setLightboxOffset={setLightboxOffset} />
          ))}
        </Grid>
      </VStack>

      {lightboxOffset > -1 && (
        <Dialog
          images={selectedImages}
          offset={lightboxOffset}
          onClose={handleCloseLightbox}
          aria-label="Gallery of my sketches on Instagram"
        />
      )}
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
