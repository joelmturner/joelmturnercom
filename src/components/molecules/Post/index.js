import React from 'react'
import styled, { css } from 'styled-components'
import { sharedFontStyles, undoBodyWrap, getNewImage } from '../../../designSystem'
import { Link } from 'gatsby'
import { Image, ImageSpacer } from './Image'
import { LinkText } from '../../atoms/Text'
import { BlogTitle, BlogBlurb, BlogContentWrap, BlogExerpt } from './Content'

const PostWrap = styled.li`
  ${undoBodyWrap()};
  margin-top: 1rem;
  margin-bottom: 1rem;
  position: relative;
  list-style: none;
`

const Post = ({ imageSrc, title, slug, blurb }) => (
  <PostWrap>
    <ImageSpacer>
      <Link to={`/${slug}`}>
        <Image src={imageSrc ? imageSrc : getNewImage()} />
      </Link>
      <BlogTitle>
        <Link to={`/${slug}`}>{title}</Link>
      </BlogTitle>
    </ImageSpacer>
    <BlogContentWrap>
      <BlogExerpt dangerouslySetInnerHTML={{ __html: blurb }} />
      <LinkText to={`/${slug}`}>Read More</LinkText>
    </BlogContentWrap>
  </PostWrap>
)

export default Post
