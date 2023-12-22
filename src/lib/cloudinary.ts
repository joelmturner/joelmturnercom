import cloudinarySDK from "cloudinary";

cloudinarySDK.v2.config({
  cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const cloudinary = cloudinarySDK.v2;
