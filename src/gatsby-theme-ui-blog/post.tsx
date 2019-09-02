/** @jsx jsx */
import { jsx, Styled, Main } from "theme-ui"
import Layout from "../components/layout"

export default (props): JSX.Element => (
  <Layout>
    <Main>
      <div
        sx={{
          maxWidth: "container",
          mx: "auto",
        }}
      >
        <Styled.h1>{props.title}</Styled.h1>
        <Styled.p
          sx={{
            fontSize: [0, 0],
            fontWeight: "bold",
          }}
        >
          {props.date}
        </Styled.p>
        {props.children}
      </div>
    </Main>
  </Layout>
)
