// @flow
import { css } from 'styled-components'
import theme, { themes } from './theme'
import GlobalStyle from './GlobalStyle'
import Row from './Row'
import Column from './Column'
import pageStyles, { Section } from './pageStyles'
import Flexbox, { FlexRowWrap, InlineFlexLockup } from '../designSystem/Flexbox'

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576,
}

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})

// Reusable Style Functions
export const themeHover = css`
  fill: ${({ theme }) => theme.copy.default.fill};
  color: ${({ theme }) => theme.copy.default.color};
  transition: fill, color 300ms;

  &:hover {
    fill: ${({ theme }) => theme.copy.hover.fill};
    color: ${({ theme }) => theme.copy.hover.color};
    transition: fill, color 300ms;
  }
`

export const undoBodyWrap = css`
  margin: 0 -1rem;
`

export const fullBleed = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const size = (width: string = '100%', height: string = width) => css`
  width: ${width};
  height: ${height};
`

export default theme
export {
  themes,
  GlobalStyle,
  Flexbox,
  FlexRowWrap,
  InlineFlexLockup,
  Row,
  Column,
  pageStyles,
  Section,
}
