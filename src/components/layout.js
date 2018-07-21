import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, Link } from "gatsby"
import Avatar from './Avatar/Avatar';
import './layout.css'
import {Box, Flex, Heading} from 'rebass';

const Layout = ({ children, data }) => (
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
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Box px={4} py={5} color='white' bg='blue'>
            <Heading
                is='h1'
                fontSize={[ 4, 5, 6 ]}>
                <Link style={{color: 'white'}} to={'/'}>{data.site.siteMetadata.title}</Link>
                <Avatar url='' size='m' />
            </Heading>
        </Box>
        <Flex
            px={4}
            py={5}
            flexDirection='column' >
                {children}
        </Flex>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
