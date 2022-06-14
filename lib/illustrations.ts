import cloudinary from "cloudinary";
import { Illustrations } from "./types";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function getIllustrations(): Promise<Illustrations> {
  let imageResults = {
    handletteredabcs_2016: [],
    inktober2017: [],
    inktober2018: [],
    inktober2019: [],
    inktober2021: [],
    joelmturner_abcs2017: [],
    joelmturner_featured: [],
    letterclash: [],
  };
  await cloudinary.v2.search
    .expression("folder:illustration")
    .sort_by("public_id", "desc")
    .max_results(300)
    .with_field("tags")
    .execute()
    .then((result) => {
      imageResults = result.resources.reduce((acc, imageResult) => {
        const tag = imageResult.tags[0];
        const image = {
          id: imageResult.asset_id,
          url: imageResult.secure_url,
          tags: imageResult.tags,
        };
        console.log("tag", tag);
        const prev = acc[tag] || [];

        acc[`${tag}`] = [...prev, image];
        return acc;
      }, {});
    });

  return imageResults;
}
