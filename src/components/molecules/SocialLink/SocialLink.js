import React from 'react'
import styled, {css} from 'styled-components';
import Icon from '../../atoms/Icon/Icon';
import {colors, themeHover} from '../../../designSystem';

export const SocialLinkWrap = styled.a`
  /* why?! */
  line-height: 0; 
  ${themeHover()};
`;

const SocialLink = ({ href, icon, children }) => (
    <SocialLinkWrap href={href}>
      {icon && <Icon glyph={icon} />}   
      {/* Remove when we add glyphs */}
      {children}
    </SocialLinkWrap>
);

export default SocialLink;