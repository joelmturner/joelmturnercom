// @flow
import React, { Component, type Node, Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'
import themes from '../designSystem'
import GlobalStyle from '../designSystem/GlobalStyle'
import Row from '../designSystem/Row'
import Header from './Header'
import Column from '../designSystem/Column'
import { BodyText } from './Text'
import Flexbox from '../designSystem'
import pageStyles from '../designSystem/pageStyles';

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

type ActiveTheme = 'light' | 'dark'

type LayoutState = {
  activeTheme: ActiveTheme,
}

type LayoutProps = {
  children: Node,
  data?: Data,
  title: string,
  slug?: string,
}

const LayoutWrap = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-template-areas:
    'header'
    'content';
  grid-template-rows: fit-content(10rem) auto fit-content(3rem);
  height: 100vh;
`

const ContentWrap = styled.div`
  padding: 0 1rem;
  grid-area: content;
  ${pageStyles()};
`

class Layout extends Component<LayoutProps, LayoutState> {
  state = {
    activeTheme: 'light',
  }
  componentDidMount() {
    if (!localStorage.getItem('activeTheme')) {
      localStorage.setItem('activeTheme', 'light')
    }
    const activeTheme: ActiveTheme =
      localStorage.getItem('activeTheme') === 'dark' ? 'dark' : 'light'
    if (this.state.activeTheme !== activeTheme) {
      this.setState({
        activeTheme,
      })
    }
  }

  render() {
    const { title, slug, children } = this.props
    const { activeTheme } = this.state

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
          <ThemeProvider theme={themes[activeTheme]}>
            <Fragment>
              <LayoutWrap>
                <Row>
                  <Column span={12} responsive>
                    <Header
                      title={title || ''}
                      slug={slug || ''}
                      social={(data && data.site.siteMetadata.social) || []}
                      mini
                      onToggleTheme={this.onToggleTheme}
                    />
                  </Column>
                </Row>
                <Row hasOverflow>
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

  onToggleTheme = () => {
    localStorage.setItem('activeTheme', this.state.activeTheme === 'light' ? 'dark' : 'light')
    this.setState({
      activeTheme: this.state.activeTheme === 'light' ? 'dark' : 'light',
    })
  }
}

export default Layout
