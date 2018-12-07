// @flow
import { css } from 'styled-components'
import { bundleStyles } from './typography'
import type { PropType } from './theme'

const pageStyles = () => css`
  p {
    color: ${({ theme }: PropType) => theme.copy.p};
    a {
      color: ${({ theme }: PropType) => theme.copy.p};
      transition: color 300ms;
      &:hover {
        color: ${({ theme }: PropType) => theme.copy.p};
        transition: color 300ms;
      }
    }
  }

  & img {
    max-width: 100%;
    height: auto;
  }

  /* page/post styles */
  blockquote {
    font-size: 1.4em;
    width: 80%;
    margin: 2rem auto;
    font-family: Open Sans;
    font-style: italic;
    color: ${({ theme }: PropType) => theme.blockquote.default.color};
    background: ${({ theme }: PropType) => theme.blockquote.default.background};
    padding: 1.2rem 2rem 1.2rem 5rem;
    border-left: 0.25rem solid ${({ theme }: PropType) => theme.blockquote.default.border};
    line-height: 1.6;
    position: relative;
  }

  blockquote::before {
    content: '"';
    color: ${({ theme }: PropType) => theme.blockquote.default.color};
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
    color: ${({ theme }: PropType) => theme.blockquote.default.color};
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

  .cols-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .gap {
    grid-gap: 1rem;
  }

  .gallery-columns-5 {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1rem;
  }

  figure.gallery-item {
    margin: 0;
    padding: 0;

    img,
    .gallery-icon {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  pre {
    background: ${({ theme }: PropType) => theme.code.default.background};
    line-height: 1.6;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    padding: 1.6em;
  }

  /* TODO: JT figure out how to remove this from wp theme */
  .link-more {
    display: none;
  }

  /* typography */
  h2 {
    ${bundleStyles('h2')};
  }
  h3 {
    ${bundleStyles('h3')};
  }
  h4 {
    ${bundleStyles('h4')};
  }
`

export default pageStyles
