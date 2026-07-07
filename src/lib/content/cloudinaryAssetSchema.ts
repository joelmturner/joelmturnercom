import { z } from 'astro/zod'

// JSON-schema-friendly subset of Cloudinary resource fields used by this site.
// avoids z.record() which breaks Astro 6's z.toJSONSchema() generation.
export const cloudinaryAssetSchema = z.looseObject({
  asset_id: z.string(),
  bytes: z.number(),
  created_at: z.string(),
  folder: z.string(),
  format: z.string(),
  height: z.number(),
  public_id: z.string(),
  resource_type: z.enum(['image', 'video', 'raw', 'auto']),
  secure_url: z.string(),
  tags: z.array(z.string()).optional(),
  type: z.string(),
  url: z.string(),
  version: z.number(),
  width: z.number(),
  context: z
    .object({
      custom: z
        .object({
          alt: z.string().optional(),
          caption: z.string().optional(),
          loop: z.string().optional(),
        })
        .catchall(z.string().optional()),
    })
    .optional(),
})
