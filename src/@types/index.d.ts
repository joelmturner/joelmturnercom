declare module "@mdx-js/react" {
  import { ComponentType, StyleHTMLAttributes, Component } from "react"
  type MDXProps = {
    children: React.ReactNode;
    components: { wrapper: React.ReactNode };
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
  let Md: (props: any) => JSX.Element
  export default Md
}
