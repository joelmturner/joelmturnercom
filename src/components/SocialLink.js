import React from 'react'
import styled from 'styled-components'
import { themeHover } from '../designSystem'

const SocialLinkWrap = styled.a`
 line-height: 0;
 ${themeHover};
`

const Icon = styled.div`
 width: 2rem;
 height: 2rem;
 border-radius: 5px;
 border: 1px solid green;
`

const SocialLink = ({ href, icon, children, className }) => (
 <SocialLinkWrap href={href} className={className}>
  {icon && <Icon glyph={icon} />}
  {children}
 </SocialLinkWrap>
)

export default SocialLink
