import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Header from './header'
import theme from '../designSystem'
import { ThemeProvider } from 'styled-components'
import LayoutWrap from './atoms/LayoutWrap'
import ContentWrap from './atoms/ContentWrap/ContentWrap'

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
