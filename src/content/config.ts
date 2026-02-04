import { defineCollection, z } from "astro:content";
import { cldAssetsLoader } from "astro-cloudinary/loaders";
import { glob } from "astro/loaders";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
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
    slug: z.string().optional(),
    video: z
      .object({
        youtubeId: z.string(),
        duration: z.string().optional(),
        uploadDate: z.coerce.date().optional(),
      })
      .optional(),
  }),
});

const til = defineCollection({
  // Type-check frontmatter using a schema
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/til" }),
  schema: z.object({
    title: z.string(),
    // Transform string to Date object
    date: z.coerce.date(),
    lastmod: z.coerce.date().optional(),
    draft: z.boolean().optional(),
    categories: z.string(),
    tags: z.array(z.string()),
    slug: z.string().optional(),
  }),
});

const illustration = defineCollection({
  loader: cldAssetsLoader({
    limit: 3000,
    folder: "illustration",
    context: true,
    metadata: true,
    tags: true,
  }),
});

const animations = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/animations" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lastmod: z.coerce.date().optional(),
    slug: z.string().optional(),
    embedId: z.string(),
    description: z.string().optional(),
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

const zines = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/zines" }),
  schema: z.object({
    title: z.string(),
    // Transform string to Date object
    date: z.coerce.date(),
    lastmod: z.coerce.date().optional(),
    slug: z.string().optional(),
    imgUrls: z.array(z.string()),
    author: z.string().default("Joel M Turner"),
    authorUrl: z.string().default("https://joelmturner.com"),
    pdfUrl: z.string().optional(),
  }),
});

export const collections = {
  blog,
  til,
  illustration,
  video,
  zines,
  animations,
};
