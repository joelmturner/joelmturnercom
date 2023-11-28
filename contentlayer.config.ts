import rehypeExternalLinks from 'rehype-external-links';
import rehypeHighlight from 'rehype-highlight';
import rehypeMetaAttribute from './src/lib/rehype-meta-attribute';
import rehypeHighlightCode from './src/lib/rehype-highlight-code';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import remarkTableOfContents from 'remark-toc';
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
});

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    draft: {
      type: 'boolean',
      description: 'Whether the post is a draft',
      required: true,
    },
    slug: {
      type: 'string',
      description: 'The slug of the post',
      required: true,
    },
    category: {
      type: 'string',
      description: 'The category of the post',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'The tags of the post',
      required: true,
    },
    lastmod: {
      type: 'date',
      description: 'The last modified date of the post',
      required: true,
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the post',
      required: false,
    },
    cover: {
      type: 'string',
      description: 'The cover image of the post',
      required: false,
    },
    featured: {
      type: 'boolean',
      description: 'Whether or not the post is featured',
      required: false,
    },
    series: {
      type: 'string',
      description: 'The series the post belongs to',
      required: false,
    },
    description: {
      type: 'string',
      description: 'The meta description the post',
      required: false,
    },
    order: {
      type: 'number',
      description: 'The order of the post in the series',
      required: false,
      default: 0,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/blog/${post._raw.flattenedPath}`,
    },
    cover: {
      type: 'string',
      resolve: (post) => {
        const cloudinaryUrl = cloudinary.url('blog_post_card_blank', {
          width: 731,
          height: 464,
          secure: true,
          force_version: true,
          transformation: [
            {
              fetch_format: 'auto',
              quality: 'auto',
            },
            {
              color: '#6B46C1',
              crop: 'fit',
              width: 430,
              overlay: {
                font_family: 'Source Sans Pro',
                font_size: 48,
                font_weight: 'bold',
                text: post.title,
              },
            },
            {
              flags: 'layer_apply',
              gravity: 'north_west',
              x: 250,
              y: 120,
            },
          ],
        });

        return post.cover || decodeURIComponent(cloudinaryUrl);
      },
    },
  },
}));

export const TIL = defineDocumentType(() => ({
  name: 'TIL',
  filePathPattern: `til/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    draft: {
      type: 'boolean',
      description: 'Whether the post is a draft',
      required: true,
    },
    slug: {
      type: 'string',
      description: 'The slug of the post',
      required: true,
    },
    category: {
      type: 'string',
      description: 'The category of the post',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'The tags of the post',
      required: true,
    },
    lastmod: {
      type: 'date',
      description: 'The last modified date of the post',
      required: true,
    },
    excerpt: {
      type: 'string',
      description: 'The excerpt of the post',
      required: false,
    },
    featured: {
      type: 'boolean',
      description: 'Whether or not the post is featured',
      required: false,
    },
    series: {
      type: 'string',
      description: 'The series the post belongs to',
      required: false,
    },
    order: {
      type: 'number',
      description: 'The order of the post in the series',
      required: false,
      default: 0,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/til/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [Blog, TIL],
  mdx: {
    rehypePlugins: [
      rehypeExternalLinks,
      rehypeHighlight,
      rehypeMetaAttribute,
      rehypeHighlightCode,
      rehypeSlug,
    ],
    remarkPlugins: [remarkGfm, [remarkTableOfContents, { tight: true }]],
  },
});
