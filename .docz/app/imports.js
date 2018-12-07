export const imports = {
  'src/Docs/Article.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-article" */ 'src/Docs/Article.mdx'),
  'src/Docs/Header.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-header" */ 'src/Docs/Header.mdx'),
}
