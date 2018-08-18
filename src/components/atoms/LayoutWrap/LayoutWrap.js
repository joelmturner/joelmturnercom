// @flow
import styled from 'styled-components'

const LayoutWrap = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-template-areas:
    'header'
    'content';
  grid-template-rows: fit-content(10rem) auto fit-content(3rem);
  height: 100vh;
`

export default LayoutWrap
