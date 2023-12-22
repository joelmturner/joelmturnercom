<script lang="ts">
  import type { IllustrationCollectionParam, Illustrations } from "@lib/types";
  import GalleryFilter from "./GalleryFilter.svelte";
  import Gallery from "./Gallery.svelte";
  import { galleryStore } from "./galleryStore";
  import { onMount } from "svelte";
  import {
    ILLUSTRATION_QUERY_VS_FILTER,
    updateCollection,
  } from "@lib/queryParams";
  import { flex } from "styled-system/patterns";

  export let collections: Illustrations;

  let collection: IllustrationCollectionParam = "featured";
  let columns: 1 | 2 | 3 = 3;

  const handleUpdateColumns = (value: number) => {
    columns = value as 1 | 2 | 3;
  };

  // TODO JT - see if there's a better way to do this
  onMount(() => {
    collection = updateCollection();
  });

  $: images = () => {
    collection = updateCollection();
    if (collection && collection !== $galleryStore) {
      galleryStore.set(collection);
    }
    return collections[ILLUSTRATION_QUERY_VS_FILTER[collection]];
  };
</script>

<div class={flex({ direction: "column", gap: "4" })}>
  <GalleryFilter onUpdateColumns={handleUpdateColumns} {columns} />
  <Gallery images={images()} {columns} />
</div>
