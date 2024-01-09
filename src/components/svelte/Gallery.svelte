<script lang="ts">
  import type { IllustrationItem } from "@lib/types";
  import { galleryGrid } from "../../styles/galleryGrid";
  import { fadeIn } from "src/styles/selectInput";
  import { css, cx } from "styled-system/css";
  import { onMount } from "svelte";
  import PhotoSwipeLightbox from "photoswipe/lightbox";
  import { COLUMNS_VS_DETAILS } from "@lib/constants";
  import "photoswipe/style.css";

  export let galleryID: string = "illustration_gallery";
  export let columns: 1 | 2 | 3 = 3;
  export let images: IllustrationItem[] = [];

  function getParams(col: 1 | 2 | 3) {
    return `h_${COLUMNS_VS_DETAILS[col].px},w_${COLUMNS_VS_DETAILS[col].px}/f_auto,q_auto`;
  }

  $: getUrl = (url: string) => {
    const [base, params] = url.split("f_auto,q_auto");
    return `${base}${getParams(columns)}${params}`;
  };

  function getSrcSet(url: string) {
    const [base, params] = url.split("f_auto,q_auto");
    return `
      ${base}${getParams(3)}${params} ${COLUMNS_VS_DETAILS[columns].px}w,
      ${base}${getParams(2)}${params} ${COLUMNS_VS_DETAILS[columns].px * 2}w,
      ${base}${getParams(1)}${params} ${COLUMNS_VS_DETAILS[columns].px * 3}w
    `;
  }

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
      <div
        class={css({
          bg: {
            _light: "gray.100",
            _dark: "slate.800",
          },
          borderRadius: "md",
          overflow: "hidden",
          w: "full",
          h: { base: "100px", md: "200px" },
          animationName: "pulse",

          // Optional attributes
          animationRepeat: "infinite", // can also be a number
          animationDuration: "2s",
          animationDelay: "1s",
        })}
      />
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
        src={getUrl(image.url)}
        alt={image.id}
        width={COLUMNS_VS_DETAILS[columns].px}
        height={COLUMNS_VS_DETAILS[columns].px}
        srcset={getSrcSet(image.url)}
        sizes="33vw, 50vw, 100vw"
        loading="lazy"
      />
    </a>
  {/each}
</div>
