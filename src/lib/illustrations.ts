import { type CloudinaryResponse, type Illustrations } from "./types";
import { cloudinary } from "./cloudinary";

export async function getIllustrations(): Promise<Illustrations> {
  const imageResults: Illustrations = {
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

  await cloudinary.search
    .expression("folder:illustration")
    .sort_by("public_id", "desc")
    .max_results(800)
    .with_field("tags")
    .execute()
    .then((result: CloudinaryResponse) => {
      for (const imageResult of result.resources) {
        const imageUrl = cloudinary.url(imageResult.public_id, {
          secure: true,
          quality: "auto",
          fetch_format: "auto",
        });

        const image = {
          id: imageResult.asset_id,
          url: imageUrl,
          tags: imageResult.tags,
          width: imageResult.width,
          height: imageResult.height,
        };

        for (const tag of imageResult.tags) {
          const prev = imageResults[tag as keyof Illustrations] || [];
          imageResults[`${tag}` as keyof Illustrations] = [...prev, image];
        }
      }
    });

  return imageResults;
}
