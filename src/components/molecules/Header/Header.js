import styled from 'styled-components'
import { SocialLinkWrap } from '../SocialLink'

const Header = styled.header`
  padding: 2.5rem 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* debug */
  background-color: #efefef;
`

export const SocialIcons = styled.div`
  display: flex;
  > ${SocialLinkWrap} {
    margin-right: 1rem;
    &:last-child {
      margin-right: 0;
    }
  }
`

export default Header