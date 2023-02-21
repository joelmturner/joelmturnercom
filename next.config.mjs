/** @type {import('next').NextConfig} */
import remarkFrontmatter from 'remark-frontmatter';
import rehypeExternalLinks from 'rehype-external-links';
import { withSentryConfig } from '@sentry/nextjs';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { withContentlayer } from 'next-contentlayer';

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            providerImportSource: '@mdx-js/react',
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
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    domains: ['res.cloudinary.com'],
    deviceSizes: [640, 750, 828, 1080],
  },
  sentry: {
    hideSourceMaps: true,
  },
};

export default withSentryConfig(
  withContentlayer(nextConfig),
  // withBundleAnalyzer(nextConfig),
  sentryWebpackPluginOptions
);
