// @flow
import React from 'react'
import styled from 'styled-components'
import { bundleStyles } from '../../designSystem/typography'
import { Link } from 'gatsby'
import type { PropType } from '../../designSystem/theme'

type LinkTextProps = {
  isjumbo: boolean,
}

export const H1 = styled.h1`
  ${bundleStyles('h1')};
`

export const H2 = styled.h2`
  ${bundleStyles('h2')};
`

export const H3 = styled.h3`
  ${bundleStyles('h3')};
`

export const H4 = styled.h4`
  ${bundleStyles('h4')};
`

export const BodyText = styled.p`
  ${bundleStyles('body')};
`

export const StyledLinkText = styled(Link)`
  ${({ isjumbo }: LinkTextProps) => !isjumbo && bundleStyles('link')};
  ${({ isjumbo }: LinkTextProps) => isjumbo && bundleStyles('jumboLink')};
`

const StyledLink = styled(Link)`
  color: ${({ theme }: PropType) => theme.copy.h2};
`

export const LinkText = (props: any) => (
  <StyledLink to={props.to} className={props.className} onClick={props.onClick}>
    {props.children}
  </StyledLink>
)
