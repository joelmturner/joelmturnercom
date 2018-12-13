// @flow
import styled from 'styled-components'
import { H2, BodyText } from '../Text'
import { bundleStyles } from '../../designSystem/typography'
import type { PropType } from '../../designSystem/theme'

export const BlogTitle = styled(H2)`
  line-height: 1.5rem !important;
  font-weight: bold !important;
  background: ${({ theme }: PropType) => theme.background};
  position: absolute;
  bottom: 1rem;
  left: 0;
  padding: 0.25rem 1rem 0.25rem 1rem;
  margin: 0;
  max-width: 75%;
  a,
  a:visited {
    color: ${({ theme }: PropType) => theme.copy.h2};
  }
`

export const BlogExerpt = styled.div`
  ${bundleStyles('body')};
`

export const BlogBlurb = styled(BodyText)`
  text-overflow: ellipsis;
  overflow: hidden;
  height: 4.5rem;
`

export const BlogContentWrap = styled.div`
  padding: 0 1rem;
`
