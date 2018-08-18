// @flow
import React, { Component, type Node, Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import theme from '../designSystem'
import Header from './header'
import LayoutWrap from './atoms/LayoutWrap'
import ContentWrap from './atoms/ContentWrap/ContentWrap'
import type { GraphQLSchema } from 'graphql'
import Row from './Grid/Row'
import Column from './Grid/Column'

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
        render={(data: Data) => (
          <ThemeProvider theme={theme}>
            <LayoutWrap>
              <Row>
                <Column span={12} responsive>
                  <Header
                    title={title || ''}
                    slug={slug || ''}
                    social={(data && data.site.siteMetadata.social) || []}
                    mini
                  />
                </Column>
              </Row>
              <Row overflow>
                <Column span={12} responsive>
                  <ContentWrap>
                    <Fragment>{children}</Fragment>
                  </ContentWrap>
                </Column>
              </Row>
            </LayoutWrap>
          </ThemeProvider>
        )}
      />
    )
  }
}

export default Layout
