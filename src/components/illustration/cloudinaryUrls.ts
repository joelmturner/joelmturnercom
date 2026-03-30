import { Cloudinary } from '@cloudinary/url-gen'
import { fit } from '@cloudinary/url-gen/actions/resize'

export const LIGHTBOX_IMAGE_SIZE = 800

const cloudName =
  (import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME as string) || 'joelmturner'
const cld = new Cloudinary({
  cloud: { cloudName },
  url: { secure: true },
})

/** lightbox URL via url-gen; fit preserves aspect ratio (no crop) */
export function getLightboxImageUrl(publicId: string): string {
  return cld
    .image(publicId)
    .resize(fit().width(LIGHTBOX_IMAGE_SIZE).height(LIGHTBOX_IMAGE_SIZE))
    .toURL()
}
