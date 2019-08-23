// @flow
import * as React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { GlobalStyle, Row, Column, Flexbox, pageStyles } from '../designSystem'
import Header from './Header'
import { BodyText } from './Text'
import { AppContext } from './Context/AppContext'

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
 children: React.Node,
 data?: Data,
 title: string,
 slug?: string,
 className?: string,
}

const LayoutWrap = styled.div`
 display: grid;
 grid-gap: 0.25em;
 grid-template-areas:
  'header'
  'content';
 grid-template-rows: minmax(3rem, 5rem) 1fr minmax(1rem, 3rem);
 max-height: 100vh;
`

const ContentWrap = styled.div`
 padding: 0 1rem;
 grid-area: content;
 ${pageStyles()};
`

function Layout({ title, slug, children, className }: LayoutProps): React.Node {
 const [activeTheme, setActiveTheme] = React.useContext(AppContext)

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
    <LayoutWrap className={className}>
     <Row>
      <Column span={12} responsive>
       <Header
        title={title || ''}
        slug={slug || ''}
        social={(data && data.site.siteMetadata.social) || []}
        mini
        onToggleTheme={() => setActiveTheme(activeTheme === 'dark' ? 'light' : 'dark')}
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
     <GlobalStyle />
    </LayoutWrap>
   )}
  />
 )
}

export default Layout
