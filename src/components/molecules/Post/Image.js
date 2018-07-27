import styled from 'styled-components';
import { fullBleed, size } from '../../../designSystem';

export const ImageSpacer = styled.div`
  background: red;
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  overflow: hidden;
`;

export const Image = styled.img`
  ${fullBleed()};
  ${size()}
  object-fit: cover;
  object-position: center center;
  max-width: 100%;
  /* override */
  height: 100% !important;
`;