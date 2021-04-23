require("dotenv").config();
module.exports = {
  flags: {
    FAST_DEV: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PARALLEL_SOURCING: true,
    DEV_SSR: true,
    PRESERVE_WEBPACK_CACHE: true,
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
    `gatsby-plugin-ts-config`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-theme-ui",
      options: {
        prismPreset: "nightOwl",
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
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_self",
              rel: "noopener noreferrer",
            },
          },
        ],
      },
    },
    `gatsby-plugin-image`,
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
      resolve: "@sentry/gatsby",
      options: {
        dsn: ***REMOVED***,
        sampleRate: 0.7,
        tracesSampleRate: 1,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://joelmturner.com",
        sitemap: "https://joelmturner.com/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
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
          "/til/dev/svelte-animated-water-svg-pictorial-fraction/",
          "/til/dev/sequential-interval-react-hook",
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
            {
              site {
                siteMetadata {
                  title
                  description
                  siteUrl
                  site_url: siteUrl
                }
              }
            }
          `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                });
              });
            },
            query: `
                {
                  allMarkdownRemark(
                    sort: { order: DESC, fields: [frontmatter___date] },
                  ) {
                    edges {
                      node {
                        excerpt
                        html
                        fields { slug }
                        frontmatter {
                          title
                          date
                        }
                      }
                    }
                  }
                }
              `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: process.env.GA_TRACKING_ID,
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        //   optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        //   experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        //   variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
      },
    },
    `gatsby-plugin-netlify`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
  ],
};
