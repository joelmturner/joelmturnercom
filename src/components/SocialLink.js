import React from 'react'
import styled from 'styled-components'
import { themeHover } from '../designSystem'

export const SocialLinkWrap = styled.a`
  /* why?! */
  line-height: 0;
  ${themeHover()};
`

const Icon = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 5px;
  border: 1px solid green;
`

const SocialLink = ({ href, icon, children }) => (
  <SocialLinkWrap href={href}>
    {icon && <Icon glyph={icon} />}
    {/* Remove when we add glyphs */}
    {children}
  </SocialLinkWrap>
)

export default SocialLink
