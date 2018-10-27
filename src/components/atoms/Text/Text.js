// @flow
import styled from 'styled-components'
import { bundleStyles } from '../../../designSystem/typography'
import { Link } from 'gatsby'

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

export const LinkText = styled(Link)`
  ${({ isjumbo }: LinkTextProps) => !isjumbo && bundleStyles('link')};
  ${({ isjumbo }: LinkTextProps) => isjumbo && bundleStyles('jumboLink')};
`
