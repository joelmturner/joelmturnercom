/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://joelmturner.com',
  generateRobotsTxt: true, // (optional)
  sitemapSize: 7000,
  exclude: ['/404', '/privacy-policy'],
  // ...other options
};

export default config;
