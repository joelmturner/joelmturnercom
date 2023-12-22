<script lang="ts">
  import type { IllustrationItem } from "@lib/types";
  import {
    galleryGrid,
    galleryTombstoneStyles,
  } from "../../styles/galleryGrid";
  import { fadeIn } from "src/styles/selectInput";
  import { cx } from "styled-system/css";
  import { onMount } from "svelte";
  import PhotoSwipeLightbox from "photoswipe/lightbox";
  import { COLUMNS_VS_DETAILS } from "@lib/constants";
  import "photoswipe/style.css";

  export let galleryID: string = "illustration_gallery";
  export let columns: 1 | 2 | 3 = 3;
  export let images: IllustrationItem[] = [];

  export const cldImageStyles = {
    cursor: "pointer",
    objectFit: "cover",
  };

  const galleryTombstone = Array(9).fill({
    width: 500,
    height: 500,
  });

  onMount(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#" + galleryID,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
  });
</script>

{#if images.length === 0}
  <div class={galleryGrid({ cols: columns })}>
    {#each galleryTombstone as image}
      <div class={galleryTombstoneStyles} />
    {/each}
  </div>
{/if}

<div class={cx("pswp-gallery", galleryGrid({ cols: columns }))} id={galleryID}>
  {#each images as image, index (index)}
    <a
      href={image.url}
      data-pswp-width={image.width}
      data-pswp-height={image.height}
      target="_blank"
      rel="noreferrer"
      class={fadeIn}
    >
      <img
        src={image.url}
        alt={image.id}
        width={COLUMNS_VS_DETAILS[columns].px}
        height={COLUMNS_VS_DETAILS[columns].px}
        sizes="33vw, 50vw, 100vw"
      />
    </a>
  {/each}
</div>
