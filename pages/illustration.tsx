import React, { useCallback, useMemo, useState } from "react";
import { MDXComponents } from "../src/components/MDXComponents";
import { FormControl, FormLabel, Grid, GridItem, Select, VStack } from "@chakra-ui/react";
import { getIllustrations } from "../lib/illustrations";
import { ChakraNextImage } from "../src/components/ChakraNextImage";
import { Illustrations, IllustrationTag } from "../lib/types";
import { ILLUSTRATION_FILTER_OPTIONS } from "../lib/constants";

type IllustrationPageProps = {
  images: Illustrations;
};

function IllustrationPage({ images }: IllustrationPageProps) {
  const [selection, setSelection] = useState<IllustrationTag>("joelmturner_featured");

  const selectedImages = useMemo(() => {
    return images[selection];
  }, [selection]);

  const handleChange = useCallback((selection: React.ChangeEvent<HTMLSelectElement>) => {
    setSelection(selection.target.value as IllustrationTag);
  }, []);

  return (
    <VStack alignItems="flex-start" gap={4}>
      <MDXComponents.h1>Explorations of Handlettering and Illustration</MDXComponents.h1>
      <FormControl>
        <FormLabel htmlFor="collection">Collection</FormLabel>
        <Select id="collection" placeholder="Select collection" onChange={handleChange}>
          {ILLUSTRATION_FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} selected={option.value === selection}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormControl>
      <Grid
        gap={2}
        w="full"
        templateColumns="repeat(4, 1fr)"
        sx={{ containIntrinsicSize: "160px", contentVisibility: "auto" }}
      >
        {selectedImages?.map(({ id, url }) => (
          <GridItem w="100%" h="154" key={id}>
            <ChakraNextImage h="100%" w="100%" src={url} alt={id} nextSize={154} />
          </GridItem>
        ))}
      </Grid>
    </VStack>
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
