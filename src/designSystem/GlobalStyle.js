// @flow
import { createGlobalStyle } from 'styled-components'
import type { PropType } from './theme'

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

    body {
        margin: 0;
        padding: 0;
        font-family: 'Source Sans Pro', sans-serif;
        background: ${({ theme }: PropType) => theme.background};
        font-size: 1.3rem;
        line-height: 1.7rem;
    }

    /* prevent bounce on scroll */
    html, body {
        min-height: 100vh;
        overflow: hidden;
    }

    /* apply a natural box layout model to all elements, but allowing components to change */
    html {
        box-sizing: border-box;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }

    a {
        text-decoration: none;
    }

`

export default GlobalStyle
