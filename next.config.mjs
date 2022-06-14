/** @type {import('next').NextConfig} */
import remarkFrontmatter from "remark-frontmatter";
import rehypeExternalLinks from "rehype-external-links";

const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            providerImportSource: "@mdx-js/react",
            rehypePlugins: [rehypeExternalLinks],
            remarkPlugins: [remarkFrontmatter],
          },
        },
      ],
    });

    return config;
  },
  reactStrictMode: true,
  experimental: { esmExternals: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
