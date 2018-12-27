// @flow
import React from 'react'
import styled from 'styled-components'
import {
  getH1Styles,
  getH2Styles,
  getH3Styles,
  getH4Styles,
  getBodyStyles,
  getLinkStyles,
  getJumboLinkStyles,
} from '../../designSystem/typography'
import { Link } from 'gatsby'

type LinkTextProps = {
  isjumbo: boolean,
}

export const H1 = styled.h1`
  ${getH1Styles};
`

export const H2 = styled.h2`
  ${getH2Styles};
`

export const H3 = styled.h3`
  ${getH3Styles};
`

export const H4 = styled.h4`
  ${getH4Styles};
`

export const BodyText = styled.p`
  ${getBodyStyles};
`

export const StyledLinkText = styled(Link)`
  ${({ isjumbo }: LinkTextProps) => (!isjumbo ? getLinkStyles : getJumboLinkStyles)};
`

export const LinkText = (props: any) => (
  <StyledLinkText to={props.to} className={props.className} onClick={props.onClick}>
    {props.children}
  </StyledLinkText>
)
