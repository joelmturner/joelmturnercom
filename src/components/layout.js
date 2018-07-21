import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Box, Flex, Heading } from 'rebass'
import Header from './Header'
import styled from 'styled-components'

const LayoutWrap = styled.div`
  display: grid;
  grid-template-rows: 3rem auto;

  height: 100vh;
  grid-template-rows: auto;
  padding-bottom: 2rem;
`;

const ContentWrap = styled.div`
    padding: 0 1rem;
    overflow-y: auto;

    p {
        line-height: 1.8;
        font-size: 1.25rem;
    }
`;

const Layout = ({ children, data, title, slug }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <LayoutWrap>
        <Header title={title || ''} slug={slug || ''} />
        <ContentWrap>
          <>{children}</>
        </ContentWrap>
      </LayoutWrap>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
