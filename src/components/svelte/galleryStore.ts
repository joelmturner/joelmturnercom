import type { IllustrationCollectionParam } from "@lib/types";
import { writable } from "svelte/store";

export const galleryStore = writable<IllustrationCollectionParam>(
  "joelmturner_featured",
);
