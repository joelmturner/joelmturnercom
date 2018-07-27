import styled from 'styled-components';
import {H2, BodyText} from '../../atoms/Text';

export const BlogTitle = styled(H2)`
  /* pageStyles hack */
  color: #ca9874 !important;
  line-height: 1.5rem !important;
  font-weight: bold !important;
  /* end pageStyles hack */
  background: white;
  position: absolute;
  bottom: 1rem;
  left: 0;
  padding: 0.25rem 1rem 0.25rem 1rem;
  margin: 0;
  max-width: 75%;
`;

export const BlogBlurb = styled(BodyText)`
  /* TODO: clip after 3 lines */
  text-overflow: ellipsis;
  overflow: hidden;
  /* white-space: nowrap; */
  height: 4.5rem;
`

export const BlogContentWrap = styled.div`
  padding: 0 1rem;
`