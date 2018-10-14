// import styled, { css } from 'styled-components'
import { css } from 'styled-components'
import theme from './theme'
import GlobalStyle from './GlobalStyle'
const { navy, sandstone } = theme.colors

// Reusable Style Functions
export const themeHover = () => css`
  fill: ${navy};
  color: ${navy};
  transition: fill, color 300ms;

  &:hover {
    fill: ${sandstone};
    color: ${sandstone};
    transition: fill, color 300ms;
  }
`

export const bodyWrapperStyles = () => css`
  padding: 0 1rem;
  /* padding: 0 2rem; */
`

export const undoBodyWrap = () => css`
  margin: 0 -1rem;
`

export const fullBleed = () => css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const size = (width = '100%', height = width) => css`
  width: ${width};
  height: ${height};
`

export const getNewImage = () => {
  const d = 500
  const r = Math.round(Math.random() * 100)
  return `https://picsum.photos/${d + r}/?random`
}

export default theme
export { GlobalStyle }
