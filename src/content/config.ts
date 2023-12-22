import { defineCollection, z } from "astro:content";

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
    category: z.string(),
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
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { blog, til };
