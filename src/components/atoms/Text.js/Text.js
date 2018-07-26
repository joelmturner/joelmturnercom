import styled, {css} from 'styled-components';
import {sharedFontStyles, resetType} from '../../../designSystem';

export const H1 = styled.h1`
  ${sharedFontStyles()}
  ${resetType()}
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 2rem;
  color: ${({theme}) => theme.colors.navy};
  /* make this conditional */
  ${ props => props.gold && css`
    color: ${props.theme.colors.sandstone};
  `}
`;

export const H2 = styled.h2`
  ${sharedFontStyles()}
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.colors.sandstone};
`;

export const H3 = styled.h3`
  ${sharedFontStyles()}
  font-size: 1.25rem;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.navy};
`;

export const H4 = styled.h4`
  ${sharedFontStyles()}
  ${resetType()}
  margin-bottom: 1rem;
  font-size: 0.75rem;
  line-height: 1.125rem;
  color: ${({ theme }) => theme.colors.sandstone};
`

// Body
export const Body = styled.p`
  ${sharedFontStyles()};
  margin: 1rem 0 0.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.colors.black};
  /* when is this true? */
  ${ props => props.grey && css`
    color: ${props.theme.colors.greyishBrown};
  `}
`;

// export const LinkText = styled.


/*
 *
 * DELETE THESE
 * 
 */

export const Text2 = styled.h4`
  ${sharedFontStyles()}
  font-size: 0.75rem;
  line-height: 1.125rem;
  margin: 0;
`

export const BodyText = styled.p`
  ${sharedFontStyles()};
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${({ theme }) => theme.colors.black};
  /* when is this true? */
  ${ props => props.grey && css`
    color: ${props.theme.colors.greyishBrown};
  `}
`;