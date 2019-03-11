// @flow
import { css } from 'styled-components'
import type { PropType } from './theme'

export const sharedFontStyles = css`
 font-family: 'Source Sans Pro', sans-serif;
 font-weight: normal;
 font-style: normal;
 font-stretch: normal;
 letter-spacing: normal;
 color: inherit;
`

export const reset = css`
 padding: 0;
 margin: 0;
`

// Bundle Font styles for blog markup
export const getH1Styles = css`
 ${sharedFontStyles};
 ${reset};
 font-size: 1.75rem;
 font-weight: bold;
 line-height: 2.25rem;
 color: ${({ theme }: PropType) => theme.copy.h1};
`

export const getH2Styles = css`
 ${sharedFontStyles};
 font-size: 1.5rem;
 font-weight: bold;
 line-height: 2rem;
 color: ${({ theme }: PropType) => theme.copy.h2};
`

export const getH3Styles = css`
 ${sharedFontStyles};
 font-size: 1.3rem;
 line-height: 2rem;
 color: ${({ theme }: PropType) => theme.copy.h3};
`

export const getH4Styles = css`
 ${sharedFontStyles};
 ${reset};
 margin-bottom: 1rem;
 font-size: 1.2rem;
 line-height: 1.5rem;
 color: ${({ theme }: PropType) => theme.copy.h4};
`

export const getBodyStyles = css`
 ${sharedFontStyles};
 font-size: 1.3rem;
 line-height: 1.7rem;
 color: ${({ theme }: PropType) => theme.copy.p};
`

export const getLinkStyles = css`
 ${sharedFontStyles};
 font-weight: normal;
 margin-bottom: 1rem;
 font-size: 1.2rem;
 line-height: 1.5rem;
 display: inline-block;
 color: ${({ theme }: PropType) => theme.copy.link.default.color};
 transition: color 300ms;
 cursor: pointer;
 &:hover {
  color: ${({ theme }: PropType) => theme.copy.link.hover.color};
  transition: color 300ms;
 }
`

export const getJumboLinkStyles = css`
 ${sharedFontStyles};
 ${getH1Styles};
 margin-top: 1.5rem;
 text-transform: uppercase;
 display: inline-block;
 color: ${({ theme }: PropType) => theme.copy.link.default.color};
 border-bottom: 2px solid ${({ theme }: PropType) => theme.copy.link.default.color};
`
