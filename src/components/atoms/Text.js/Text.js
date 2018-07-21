import styled from 'styled-components';
import {sharedFontStyles} from '../../../designSystem';

// Headline
export const Text1 = styled.h1`
  ${sharedFontStyles()}
  font-size: 24px;
  font-weight: bold;
  line-height: 2rem;
  margin: 0;
`;

export const Text2 = styled.h4`
  ${sharedFontStyles()}
  font-size: 0.75rem;
  line-height: 1.125rem;
  margin: 0;
`

// Body
export const BodyText = styled.p`
  ${sharedFontStyles()};
`;

