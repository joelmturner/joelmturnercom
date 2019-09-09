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

interface PageInput {
  path: string;
  component: string;
  layout?: string;
  context?: any;
}

interface BoundActionCreators {
  createPage: (page: PageInput) => void;
  deletePage: (page: PageInput) => void;
  createRedirect: (opts: {
    fromPath: string;
    isPermanent?: boolean;
    redirectInBrowser?: boolean;
    toPath: string;
  }) => void;
}

export type GatsbyCreatePages = (fns: { graphql: any; boundActionCreators: BoundActionCreators }) => void

export type GatsbyCreateSchemaCustomization = (actions: any, schema: any) => void
