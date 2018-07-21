import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link } from 'gatsby'
import { Box, Flex, Heading } from 'rebass'
import Header from './Header'
import styled from 'styled-components'
import Avatar from './atoms/Avatar';
import SocialLink, { SocialLinkWrap } from './molecules/SocialLink';
import { Text1, Text2, BodyText } from './atoms/Text.js';
import {bodyWrapperStyles} from '../designSystem';
import Section from './atoms/Section';
import {Twitter, Github, Instagram} from 'styled-icons/fa-brands/';

const LayoutWrap = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 3rem auto;
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
      <LayoutWrap>
        <Header title={title || ''} slug={slug || ''} social={data.site.siteMetadata.social} />
        { console.log('data', data) }
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
