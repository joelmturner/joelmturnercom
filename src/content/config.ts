import { defineCollection, z } from "astro:content";
import { cldAssetsLoader } from "astro-cloudinary/loaders";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Transform string to Date object
    date: z.coerce.date(),
    lastmod: z.coerce.date().optional(),
    cover: z.string().optional(),
    draft: z.boolean().optional(),
    excerpt: z.string().optional(),
    categories: z.string(),
    tags: z.array(z.string()),
  }),
});

const til = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    // Transform string to Date object
    date: z.coerce.date(),
    lastmod: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    categories: z.string(),
    tags: z.array(z.string()),
  }),
});

const illustration = defineCollection({
  loader: cldAssetsLoader({
    limit: 800,
    folder: "illustration",
    context: true,
    metadata: true,
    tags: true,
  }),
});

const video = defineCollection({
  loader: cldAssetsLoader({
    limit: 10,
    resourceType: "video",
    folder: "illustration-videos",
    context: true,
    metadata: true,
    tags: true,
  }),
});

export const collections = { blog, til, illustration, video };
