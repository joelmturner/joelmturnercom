declare module "@mdx-js/react" {
  import { Component, ReactNode } from "react"
  type MDXProps = {
    children: ReactNode;
    components: { wrapper: ReactNode };
  }
  export class MDXProvider extends Component<MDXProps> {}
}

declare module "gatsby-theme-ui-blog/src/gatsby-plugin-theme-ui" {
  import { Theme } from "theme-ui"
  const theme: Theme
  export default theme
}

declare module "@theme-ui/prism/presets/theme-ui" {
  const prism: any
  export default prism
}
declare module "@theme-ui/typography" {
  type ToTheme = (theme: any) => any
  const toTheme: ToTheme
  export { toTheme }
}
declare module "typography-theme-noriega" {
  const noriega: any
  export default noriega
}

declare module "*.md" {
  // eslint-disable-next-line no-undef
  let Md: (props: any) => JSX.Element
  export default Md
}

declare module '@theme-ui/prism';
declare module 'mdx-utils';
