import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Header from './Header'
import styled from 'styled-components'
import theme, { pageStyles } from '../designSystem'
import { ThemeProvider } from 'styled-components'

const LayoutWrap = styled.div`
  display: grid;
  grid-template-rows: fit-content(10rem) auto;
  height: 100vh;
  padding-bottom: 2rem;
  max-width: 60rem;
  justify-content: center;
  margin: 0 auto;
`

const ContentWrap = styled.div`
  padding: 0 1rem;
  overflow-y: auto;

  ${pageStyles()};
`

const Layout = ({ children, data, title, slug }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            social {
              network
              link
            }
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <LayoutWrap>
          <Header
            title={title || ''}
            slug={slug || ''}
            social={data.site.siteMetadata.social}
            mini
          />
          <ContentWrap>
            <>{children}</>
          </ContentWrap>
        </LayoutWrap>
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
