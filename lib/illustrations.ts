import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function getIllustrations(): Promise<{ id: string; url: string }[]> {
  let imageResults = [];
  await cloudinary.v2.search
    .expression("folder:illustration")
    .sort_by("public_id", "desc")
    .execute()
    .then((result) => {
      imageResults = result.resources.map((imageResult) => ({
        id: imageResult.asset_id,
        url: imageResult.secure_url,
      }));
    });

  return imageResults;
}
