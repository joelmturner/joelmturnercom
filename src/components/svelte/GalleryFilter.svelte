<script lang="ts">
  import { css, cx } from "styled-system/css";
  import { ILLUSTRATION_FILTER_OPTIONS } from "@lib/constants";
  import { galleryStore } from "./galleryStore";
  import { selectInput } from "src/styles/selectInput";
  import type { IllustrationTag } from "@lib/types";
  import { onMount } from "svelte";
  import { updateCollection } from "@lib/queryParams";
  import { flex } from "styled-system/patterns";
  import { gridButtonStyles } from "src/styles/galleryGrid";

  export let onUpdateColumns: (value: number) => void;
  export let columns: 1 | 2 | 3 = 3;

  let collection: IllustrationTag;
  let params: any = {};
  onMount(() => {
    galleryStore.set(collection);
    collection = updateCollection();
  });

  const handleSelect = (event: Event) => {
    const value = (event.target as HTMLSelectElement)?.value;

    if (value) {
      galleryStore.set(value as IllustrationTag);

      // update the url without reloading the page
      params.collection = value;
      const newParams = new URLSearchParams(params);
      const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${newParams}`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };
</script>

<div
  class={flex({ justify: "space-between", alignItems: "flex-end", gap: "4" })}
>
  <div class={flex({ direction: "column", w: "full" })}>
    <label
      for="collections"
      class={css({
        display: "block",
        mb: "2",
        fontSize: "sm",
        lineHeight: "sm",
        fontWeight: "medium",
        color: "gray.900",
        _dark: { color: "white" },
      })}
    >
      Select a collection
    </label>
    <select
      on:change|preventDefault={handleSelect}
      id="collections"
      class={selectInput}
      value={collection || $galleryStore}
    >
      {#each ILLUSTRATION_FILTER_OPTIONS as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  </div>
  <div class={flex({ gap: "2", alignItems: "flex-end", h: "full" })}>
    <button
      type="button"
      class={cx(`${columns === 1 ? "active" : ""}`, gridButtonStyles)}
      on:click|preventDefault={(event) => onUpdateColumns(1)}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 448 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"
        />
      </svg>
    </button>
    <button
      type="button"
      class={cx(`${columns === 2 ? "active" : ""}`, gridButtonStyles)}
      on:click|preventDefault={(event) => onUpdateColumns(2)}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"
        />
      </svg>
    </button>
    <button
      type="button"
      class={cx(`${columns === 3 ? "active" : ""}`, gridButtonStyles)}
      on:click|preventDefault={(event) => onUpdateColumns(3)}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"
        />
      </svg>
    </button>
  </div>
</div>
