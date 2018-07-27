import React from 'react';
import styled, { css } from 'styled-components';
import { sharedFontStyles, undoBodyWrap, getNewImage } from '../../../designSystem';
import { Link } from 'gatsby';
import {Image, ImageSpacer} from './Image';
import {LinkText} from '../../atoms/Text'
import {BlogTitle, BlogBlurb, BlogContentWrap} from './Content';

const PostWrap = styled.li`
    ${undoBodyWrap()};
    margin-top: 1rem;
    position: relative;
    list-style: none;
`;

const Post = ({imageSrc, title, slug, blurb}) => (
  <PostWrap>
    <ImageSpacer>
      <Image src={imageSrc ? imageSrc : getNewImage()} />
      <BlogTitle>{title}</BlogTitle>
    </ImageSpacer>
    <BlogContentWrap>
      <BlogBlurb grey>
        Listicle aesthetic mixtape umami kombucha schlitz farm-to-table, street art organic crucifix truffaut chambray deep v fam pork belly. Four loko chillwave hexagon organic, narwhal single-origin coffee everyday carry disrupt vaporware humblebrag. Tofu cred venmo, health goth live-edge cronut air plant tumblr locavore meggings quinoa edison bulb kinfolk kale chips single-origin coffee. Keffiyeh gentrify authentic, franzen blog letterpress 8-bit tilde. Kale chips kogi cardigan DIY, man braid swag actually tbh palo santo portland chia.
      </BlogBlurb>
      <LinkText to={`/${slug}`}>Read More</LinkText>
    </BlogContentWrap>
  </PostWrap>
);

export default Post;
