// @flow
import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled, { ThemeProvider } from 'styled-components'
import { themes, GlobalStyle, Row, Column, Flexbox, pageStyles } from '../designSystem'
import Header from './Header'
import { BodyText } from './Text'

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
  children: React.Node,
  data?: Data,
  title: string,
  slug?: string,
}

const LayoutWrap = styled.div`
  display: grid;
  grid-gap: 0.25em;
  grid-template-areas:
    'header'
    'content';
  grid-template-rows: fit-content(10rem) auto minmax(1rem, 3rem);
  height: 100vh;
`

const ContentWrap = styled.div`
  padding: 0 1rem;
  grid-area: content;
  ${pageStyles()};
`

class Layout extends React.Component<LayoutProps, LayoutState> {
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
            <>
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
                      <>{children}</>
                    </ContentWrap>
                  </Column>
                </Row>
                <Flexbox center middle>
                  <BodyText>© Copyright 2018 Joel M Turner</BodyText>
                </Flexbox>
              </LayoutWrap>
              <GlobalStyle />
            </>
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
