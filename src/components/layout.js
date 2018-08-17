// @flow
import React, { Component, type Node, Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import theme from '../designSystem'
import Header from './header'
import LayoutWrap from './atoms/LayoutWrap'
import ContentWrap from './atoms/ContentWrap/ContentWrap'
import type { GraphQLSchema } from 'graphql'

export type Social = {
  network: string,
  link: string,
}

type Data = {
  site: {
    siteMetadata: {
      social: Social[],
    },
  },
}

type LayoutProps = {
  children: Node,
  data?: Data,
  title: string,
  slug?: string,
}

class Layout extends Component<LayoutProps, any> {
  render() {
    const { title, slug, data, children } = this.props
    return (
      <ThemeProvider theme={theme}>
        <LayoutWrap>
          <Header
            title={title || ''}
            slug={slug || ''}
            social={(data && data.site.siteMetadata.social) || []}
            mini
          />
          <ContentWrap>
            <Fragment>{children}</Fragment>
          </ContentWrap>
        </LayoutWrap>
      </ThemeProvider>
    )
  }
}

export default Layout

export const LayoutQuery: GraphQLSchema = graphql`
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
`
