// @flow
import colors from "./colors";
import { injectGlobal } from "styled-components";

injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

    body {
        margin: 0;
        padding: 0;
        font-family: 'Source Sans Pro', sans-serif;
    }

    /* prevent bounce on scroll */
    html, body {
        height: 100%;
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

`;

const theme = {
    colors
};

export default theme;
