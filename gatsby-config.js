require("dotenv").config();
module.exports = {
  flags: {
    QUERY_ON_DEMAND: true,
    FAST_DEV: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    FAST_REFRESH: true,
    PARALLEL_SOURCING: true,
  },
  siteMetadata: {
    title: `Joel M. Turner`,
    description: `I'm a kombucha lovin' Front-End Dev at Sprinklr. Love lettering, love design, love development, love Portland.`,
    author: `@joelmturner`,
    siteUrl: "https://joelmturner.com",
    social: [
      { name: "Twitter", url: "https://twitter.com/joelmturner" },
      { name: "Instagram", url: "https://www.instagram.com/joelmturner" },
      { name: "GitHub", url: "https://github.com/joelmturner" },
    ],
    keywords: [
      "react",
      "reactjs",
      "javascript",
      "typescript",
      "developer",
      "css",
      "illustration",
      "sketch",
      "handlettering",
      "portland",
      "gatsby",
      "gatsbyjs",
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-theme-ui",
      options: {
        prismPreset: "theme-ui",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `page-partials`,
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `til`,
        path: `${__dirname}/content/til`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: "31980847",
        access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
        instagram_id: process.env.INSTAGRAM_INSTAGRAM_ID,
        paginate: 1000,
        maxPosts: 10000,
        hashtags: true,
      },
    },
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 948,
            },
          },
        ],
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Joel M. Turner`,
        short_name: `Joel M. Turner`,
        start_url: `/`,
        background_color: `#121212`,
        theme_color: `#121212`,
        display: `standalone`,
        icon: `src/images/joel-turner-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        // The example below will exclude the single `path/to/page` and all routes beginning with `category`
        exclude: [
          `category/*`,
          `tag/*`,
          `til/null/*`,
          `/til/illustration*`,
          `/til/productivity*`,
          "/til/lifestyle*",
          `/til/dev*`,
          `/til/null*`,
          `/blog/uses/`,
          `/blog/privacy-policy/`,
          `/blog/storybook/`,
          `/blog/vs-code/`,
          `/blog/helpers/`,
          "/blog/mobx/",
          `/blog/react-typescript/`,
          `/blog/concepts/`,
          `/blog/about/`,
          `/blog/intro/`,
          "/til/dev/react-layout-components/",
          "/til/dev/sassy-with-sass/",
          "/til/dev/react-hooks-useslider/",
          "/til/dev/react-hooks-use-dims/",
          "/til/dev/quick-tip-graphql-fragments/",
          "/til/dev/productivity-practices-front-end-development/",
          "/til/lifestyle/pmj-artwork/",
          "/til/illustration/playing-with-type/",
          "/til/dev/inline-text-edit-react-hooks/",
          "/til/illustration/handlettering-best-of-2016/",
          "/til/productivity/front-end-ticket-checklist/",
          "/til/lifestyle/doctors-companions/",
          "/til/personal-development/decisions-we-make/",
          "/til/personal-development/daily-routine-freedom/",
          "/til/dev/data-vis-react-bar-chart-vx/",
          "/til/dev/create-a-single-line-chart-in-react-with-vx/",
          "/til/dev/beginning-web-accessibility-react/",
          "/til/dev/avatar-component-gatsby-3/",
          "/til/dev/build-gallery-react-css-grid/",
          "/til/dev/avatar-component-gatsby-2/",
          "/til/dev/avatar-component-gatsby-1/",
          "/til/dev/animated-css-timer-icon/",
          "/til/personal-development/concepts/",
          "til/null/",
        ],
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
      }`,
        resolveSiteUrl: ({ site }) => {
          //Alternatively, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
          return site.siteMetadata.siteUrl;
        },
        serialize: ({ site, allSitePage }) =>
          allSitePage.nodes.map((node) => {
            return {
              url: `${site.siteMetadata.siteUrl}${node.path}`,
              changefreq: `daily`,
              priority: 0.7,
            };
          }),
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
