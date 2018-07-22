import styled, { css } from 'styled-components'
import theme from './theme'

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

export const sharedFontStyles = () => css`
  font-family: 'Source Sans Pro', sans-serif;
`

export const bodyWrapperStyles = () => css`
  padding: 0 2rem;
`

export const pageStyles = () => css`
  p {
    line-height: 1.8;
    font-size: 1.25rem;

    a {
      color: ${({ theme }) => theme.colors.sandstone};
    }
  }

  /* page/post styles */
  blockquote {
    font-size: 1.4em;
    width: 80%;
    margin: 2rem auto;
    font-family: Open Sans;
    font-style: italic;
    color: ${({ theme }) => theme.colors.navy};
    padding: 1.2rem 2rem 1.2rem 5rem;
    border-left: 0.25rem solid ${({ theme }) => theme.colors.sandstone};
    line-height: 1.6;
    position: relative;
    background: #f9f9f9;
  }

  blockquote::before {
    content: '"';
    color: ${({ theme }) => theme.colors.sandstone};
    font-size: 4em;
    position: absolute;
    left: 0.5rem;
    top: -0.5rem;
  }

  blockquote::after {
    content: '';
  }

  blockquote span {
    display: block;
    color: ${({ theme }) => theme.colors.navy};
    font-style: normal;
    font-weight: bold;
    margin-top: 1eem;
  }

  .alignright {
    float: right;
    margin: 0.5rem 0 0.5rem 0.5rem;
  }

  .alignleft {
    float: left;
    margin: 0.5rem 0.5rem 0.5rem 0;
  }

  .aligncenter {
    display: block;
    margin: 0.25rem auto;
    text-align: center;
  }
`

export default theme
