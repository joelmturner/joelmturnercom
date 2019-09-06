/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import Layout from "../components/layout"
import { ReactElement } from "react"

export default ({ title, children }: { title: string; children: ReactElement[] }): JSX.Element => (
  <Layout>
    <Styled.h1>{title}</Styled.h1>
    {children}
  </Layout>
)
