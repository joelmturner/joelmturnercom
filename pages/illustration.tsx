import React, { useMemo } from "react";
import { MDXComponents } from "../src/components/MDXComponents";
import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { getIllustrations } from "../lib/illustrations";
import { ChakraNextImage } from "../src/components/ChakraNextImage";

type IllustrationPageProps = {
  images: { id: string; url: string }[];
};

function IllustrationPage({ images }: IllustrationPageProps) {
  console.log("images", images);
  return (
    <VStack alignItems="flex-start">
      <MDXComponents.h1>Explorations of Handlettering and Illustration</MDXComponents.h1>
      <Grid
        gap={4}
        w="full"
        templateColumns="repeat(4, 1fr)"
        sx={{ containIntrinsicSize: "160px", contentVisibility: "auto" }}
      >
        {images?.map(({ id, url }) => (
          <GridItem w="100%" h="100" key={id}>
            <ChakraNextImage h="100%" w="100%" src={url} alt={id} />
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
