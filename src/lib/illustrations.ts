import { type IllustrationItem, type Illustrations } from "./types";
import { cloudinary } from "./cloudinary";
import { getCollection } from "astro:content";

export async function getIllustrations(): Promise<Illustrations> {
  const initialImageResults: Illustrations = {
    handletteredabcs_2016: [],
    inktober2017: [],
    inktober2018: [],
    inktober2019: [],
    inktober2021: [],
    inktober2022: [],
    inktober2023: [],
    joelmturner_abcs2017: [],
    joelmturner_featured: [],
    jmt_dorbs: [],
    letterclash: [],
  };

  const illustrations = await getCollection("illustration");

  return illustrations.reduce((imageResults, illustration) => {
    const imageUrl = cloudinary.url(illustration.id, {
      secure: true,
      quality: "auto",
      fetch_format: "auto",
    });

    const image: IllustrationItem = {
      id: illustration.id,
      url: imageUrl,
      tags: illustration.data.tags || [],
      width: illustration.data.width,
      height: illustration.data.height,
    };

    illustration.data.tags?.forEach((tag) => {
      const key = tag as keyof Illustrations;
      imageResults[key] = [...(imageResults[key] || []), image];
    });

    return imageResults;
  }, initialImageResults);
}
