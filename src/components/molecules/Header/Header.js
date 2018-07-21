import React from 'react'
import styled, { css } from 'styled-components';
import SocialLink, { SocialLinkWrap } from '../SocialLink';
import {Avatar} from '../../layout';
import { Twitter, Github, Instagram } from 'styled-icons/fa-brands/';

const Header = styled.header`
  padding: 2.5rem 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* debug */
  background-color: #efefef;
`;

export const SocialIcons = styled.div`
  display: flex;
  > ${SocialLinkWrap} {
    margin-right: 1rem;
    &:last-child { margin-right: 0; }
  }
`;

// const Header = ({ social }) => (
//     <HeaderWrap>
//         <Avatar />
//         <SocialIcons>
//             {social.map(x => (
//                 <SocialLink
//                     key={x.network}
//                     href={x.link}
//                     // icon={x.network} 
//                     >
//                     {x.network === 'instagram' && <Instagram size={24} />}
//                     {x.network === 'twitter' && <Twitter size={24} />}
//                     {x.network === 'github' && <Github size={24} />}
//                 </SocialLink>
//             ))}
//         </SocialIcons>
//     </HeaderWrap>
// );

export default Header;