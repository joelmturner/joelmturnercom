/** @type {import('next').NextConfig} */
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";
import rehypeHighlight from "rehype-highlight";

import fauxRemarkEmbedder from "@remark-embedder/core";
import fauxOembedTransformer from "@remark-embedder/transformer-oembed";
const remarkEmbedder = fauxRemarkEmbedder.default;
const oembedTransformer = fauxOembedTransformer.default;

const nextConfig = {
  //   webpack: (config, options) => {
  //     config.module.rules.push({
  //       test: /\.mdx?$/,
  //       use: [
  //         options.defaultLoaders.babel,
  //         {
  //           loader: "@mdx-js/loader",
  //           options: {
  //             providerImportSource: "@mdx-js/react",
  //             rehypePlugins: [rehypeExternalLinks, rehypeHighlight],
  //             remarkPlugins: [remarkGfm, remarkFrontmatter, [remarkEmbedder, { transformers: [oembedTransformer] }]],
  //           },
  //         },
  //       ],
  //     });

  //     return config;
  //   },
  reactStrictMode: true,
  experimental: { esmExternals: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
