import React from 'react'
import { Link } from 'gatsby'
import { H1, H2, H3, H4, BodyText, LinkText } from '../components/atoms/Text'
import Layout from '../components/layout'

const SecondPage = props => {
  const pages = props.data.allWordpressPage.edges

  return (
    <Layout>
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2, where we list all the OTHER pages</p>

      <h2>Type Styles</h2>
      <H1>Header 1</H1>
      <H1 gold>Header 1</H1>
      <H2>Header 2</H2>
      <H3>Header 3</H3>
      <H4>Header 4</H4>
      <BodyText>BodyText</BodyText>
      <BodyText grey>BodyText Grey</BodyText>
      <LinkText>Link Text</LinkText>
      <div />
      <LinkText jumbo>Link Text Jumbo</LinkText>

      <h2>Pages</h2>
      {pages &&
        pages.map(page => (
          <li key={page.node.id}>
            <Link to={`/${page.node.slug}`}>{page.node.title}</Link>
          </li>
        ))}

      <hr />

      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default SecondPage

export const pageQuery = graphql`
  {
    allWordpressPage {
      edges {
        node {
          id
          slug
          status
          template
          title
        }
      }
    }
  }
`
