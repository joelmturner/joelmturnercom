import styled from 'styled-components'
import pageStyles from '../../../designSystem/pageStyles'
import Column from '../../Grid/Column'

const ContentWrap = styled.div`
  padding: 0 1rem;
  grid-area: content;
  overflow: auto;
  ${pageStyles()};

  /* @media (min-width: 500px) {
    grid-column: span 8 / 11;
  } */
`

export default ContentWrap
