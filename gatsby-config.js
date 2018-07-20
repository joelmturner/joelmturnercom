module.exports = {
    siteMetadata: {
        title: 'Joel M Turner',
    },
    plugins: [
        /*
         * Gatsby's data processing layer begins with “source”
         * plugins. Here the site sources its data from Wordpress.
         */
        {
            resolve: "gatsby-source-wordpress",
            options: {
                /*
                 * The base URL of the Wordpress site without the trailingslash and the protocol. This is required.
                 * Example : 'gatsbyjsexamplewordpress.wordpress.com' or 'www.example-site.com'
                 */
                baseUrl: "joelmturner.com",
                // The protocol. This can be http or https.
                protocol: "https",
                // Indicates whether the site is hosted on wordpress.com.
                // If false, then the assumption is made that the site is self hosted.
                // If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
                // If your site is hosted on wordpress.org, then set this to false.
                hostingWPCOM: false,
                // If useACF is true, then the source plugin will try to import the Wordpress ACF Plugin contents.
                // This feature is untested for sites hosted on Wordpress.com.
                // Defaults to true.
                useACF: true,
                // Set verboseOutput to true to display a verbose output on `npm run develop` or `npm run build`
                // It can help you debug specific API Endpoints problems.
                verboseOutput: false,
                // Set how many pages are retrieved per API request.
                perPage: 100,
                // Search and Replace Urls across WordPress content.
                searchAndReplaceContentUrls: {
                    sourceUrl: "https://source-url.com",
                    replacementUrl: "https://replacement-url.com",
                },
                // Set how many simultaneous requests are sent at once.
                concurrentRequests: 10,
                // Exclude specific routes using glob parameters
                // See: https://github.com/isaacs/minimatch
                // Example:  `["/*/*/comments", "/yoast/**"]` will exclude routes ending in `comments` and
                // all routes that begin with `yoast` from fetch.
                excludedRoutes: ["/*/*/comments", "/yoast/**"],
                // use a custom normalizer which is applied after the built-in ones.
                normalizer: function ({ entities }) {
                    return entities
                },
            },
        },
        'gatsby-plugin-react-helmet',
    ],
}
