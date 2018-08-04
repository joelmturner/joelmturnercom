// @flow
import React, { type Node, Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Header from './header'
import LayoutWrap from './atoms/LayoutWrap'
import ContentWrap from './atoms/ContentWrap/ContentWrap'

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

const Layout = ({ children, title, slug }: LayoutProps) => (
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
      <LayoutWrap>
        <Header title={title || ''} slug={slug || ''} social={data.site.siteMetadata.social} mini />
        <ContentWrap>
          <Fragment>{children}</Fragment>
        </ContentWrap>
      </LayoutWrap>
    )}
  />
)

export default Layout
