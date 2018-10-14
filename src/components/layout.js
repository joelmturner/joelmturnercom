// @flow
import React, { Component, type Node, Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import theme from '../designSystem'
import GlobalStyle from '../designSystem/GlobalStyle'
import Header from './header'
import LayoutWrap from './atoms/LayoutWrap'
import ContentWrap from './atoms/ContentWrap/ContentWrap'
import Row from './Grid/Row'
import Column from './Grid/Column'
import { BodyText } from './atoms/Text/Text'
import Flexbox from '../components/Flexbox'

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
    const { title, slug, children } = this.props

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
            <Fragment>
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
                <Row maxColumns={1}>
                  <Flexbox center>
                    <BodyText>© Copyright 2018 Joel M Turner</BodyText>
                  </Flexbox>
                </Row>
              </LayoutWrap>
              <GlobalStyle />
            </Fragment>
          </ThemeProvider>
        )}
      />
    )
  }
}

export default Layout
