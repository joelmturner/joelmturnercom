// import styled, { css } from 'styled-components'
import { css } from 'styled-components'

export const sharedFontStyles = () => css`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  color: inherit;
`;

export const reset = () => css`
  padding: 0;
  margin: 0;
`

// Bundle Font styles for blog markup
const getH1Styles = () => css`
    ${reset()}
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 2rem;
    color: ${({ theme }) => theme.colors.navy};

    /* make this conditional */
    ${ props => props.gold && css`
        color: ${props.theme.colors.sandstone};
    `}
`

const getH2Styles = () => css`
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1.5rem;
    color: ${({ theme }) => theme.colors.sandstone};
`;

const getH3Styles = () => css`
    font-size: 1.25rem;
    line-height: 2rem;
    color: ${({ theme }) => theme.colors.navy};
`;

const getH4Styles = () => css`
    ${reset()}
    margin-bottom: 1rem;
    font-size: 0.75rem;
    line-height: 1.125rem;
    color: ${({ theme }) => theme.colors.sandstone};
`;

const getBodyStyles = () => css`
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    line-height: 1.5rem;
    color: ${({ theme }) => theme.colors.black};
    
    /* when is this true? */
    ${ props => props.grey && css`
        color: ${props.theme.colors.greyishBrown};
    `}
`;

const getLinkStyles = () => css`
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.875rem;
    line-height: 1.25rem;
    display: inline-block;
    border-bottom: 1px solid;
`;

const getJumboLinkStyles = () => css`
    ${getH1Styles()}
    margin-top: 1.5rem;
    text-transform: uppercase;
    display: inline-block;
    color: ${props => props.theme.colors.sandstone};
    border-bottom: 2px solid ${props => props.theme.colors.sandstone};
`

export const bundleStyles = style => css`
  ${sharedFontStyles()};
  ${style === 'h1'   && getH1Styles() };
  ${style === 'h2'   && getH2Styles() };
  ${style === 'h3'   && getH3Styles() };
  ${style === 'h4'   && getH4Styles() };
  ${style === 'body' && getBodyStyles() };
  ${style === 'link' && getLinkStyles() };
  ${style === 'jumboLink' && getJumboLinkStyles() };
`;

