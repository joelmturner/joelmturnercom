import styled, {css} from 'styled-components';
import {sharedFontStyles, bundleStyles} from '../../../designSystem/typography';
import { Link } from 'gatsby'

export const H1 = styled.h1`
  ${bundleStyles('h1')};
`;

export const H2 = styled.h2`
  ${bundleStyles('h2')};
`;

export const H3 = styled.h3`
  ${bundleStyles('h3')};
`;

export const H4 = styled.h4`
  ${bundleStyles('h4')};
`

export const BodyText = styled.p`
  ${bundleStyles('body')};
`;

export const LinkText = styled(Link)`
  ${ props => !props.jumbo && bundleStyles('link')};
  ${ props => props.jumbo  && bundleStyles('jumboLink')};
`;

/*
 *
 * DELETE THESE
 * 
 */

// export const Text2 = styled.h4`
//   ${sharedFontStyles()}
//   font-size: 0.75rem;
//   line-height: 1.125rem;
//   margin: 0;
// `

// export const BodyText = styled.p`
//   ${sharedFontStyles()};
//   font-size: 1rem;
//   line-height: 1.5rem;
//   color: ${({ theme }) => theme.colors.black};
//   /* when is this true? */
//   ${ props => props.grey && css`
//     color: ${props.theme.colors.greyishBrown};
//   `}
// `;