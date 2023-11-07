import cloudinary from 'cloudinary';
import { CloudinaryResponse, Illustrations } from './types';

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

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

  await cloudinary.v2.search
    .expression('folder:illustration')
    .sort_by('public_id', 'desc')
    .max_results(800)
    .with_field('tags')
    .execute()
    .then((result: CloudinaryResponse) => {
      for (const imageResult of result.resources) {
        const image = {
          id: imageResult.asset_id,
          url: imageResult.secure_url,
          tags: imageResult.tags,
          width: imageResult.width,
          height: imageResult.height,
        };

        for (const tag of imageResult.tags) {
          const prev = imageResults[tag] || [];
          imageResults[`${tag}`] = [...prev, image];
        }
      }
    });

  return imageResults;
}
