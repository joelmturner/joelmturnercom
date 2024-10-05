import { type IllustrationItem } from "./types";
import { getCollection } from "astro:content";
import { getCldImageUrl } from "astro-cloudinary/helpers";

export async function getIllustrations(): Promise<IllustrationItem[]> {
  const illustrations = await getCollection("illustration");

  return illustrations
    .map(({ id, data }) => ({
      id,
      url: getCldImageUrl({
        src: id,
        width: data.width,
        height: data.height,
        format: "auto",
      }),
      tags: data.tags || [],
      width: data.width,
      height: data.height,
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}
