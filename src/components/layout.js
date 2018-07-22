import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Box, Flex, Heading } from 'rebass'
import Header from './Header'
import styled from 'styled-components'
import Avatar from './atoms/Avatar'
import SocialLink, { SocialLinkWrap } from './molecules/SocialLink'
import { Text1, Text2, BodyText } from './atoms/Text.js'
import theme, { bodyWrapperStyles, pageStyles } from '../designSystem'
import Section from './atoms/Section'
import { Twitter, Github, Instagram } from 'styled-icons/fa-brands/'
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
            about {
              name
              bio
            }
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
