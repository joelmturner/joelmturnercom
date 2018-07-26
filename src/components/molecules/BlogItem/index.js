import styled, { css } from 'styled-components';
import { sharedFontStyles } from '../../../designSystem';
import { Link } from 'gatsby'

const PostEntryContainer = styled.li`
    margin: 0 -1rem 1rem;
    position: relative;
    /* debug */
    border: 1px solid lime;
    /* list reset */
    list-style: none;
`;

const fullBleed = () => css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const size100 = () => css`
  width: 100%;
  height: 100%;
`

const ImageSpacer = styled.div`
  background: red;
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
`;

const Image = styled.img`
  ${fullBleed()};
  ${size100()};
  object-fit: cover;
  object-position: center center;
  max-width: 100%;
`;

const BlogTitle = styled.h2`
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: #ca9874;
  background: white;
  position: absolute;
  bottom: 1rem;
  left: 0;
  padding: 0.25rem 0 0.25rem 1rem;
  margin: 0;
  max-width: 50%;
`;

const BlogBlurb = styled.p`
  font-size: 1rem;
  line-height: 1.5rem;
  color: #505050;
  /* working */
  text-overflow: ellipsis;
  /* Needed to make it work */
  overflow: hidden;
  /* white-space: nowrap; */
  height: 4.5rem;
`

const BlogContentWrap = styled.div`
  padding: 0 1rem;
`

const TextLink = styled(Link)`
  ${sharedFontStyles};
  font-size: 0.875rem;
  line-height: 1.25rem;
  display: inline-block;
  border-bottom: 1px solid;
`;

const getNewImage = () => {
    const d = 500;
    const r = Math.round(Math.random() * 100);
    return `https://picsum.photos/${d + r}/?random`
}

export { PostEntryContainer, ImageSpacer, Image, BlogTitle, BlogBlurb, BlogContentWrap, TextLink, getNewImage };