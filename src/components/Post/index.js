// @flow
import React from 'react'
import styled from 'styled-components'
import { undoBodyWrap } from '../../designSystem'
import { Link } from 'gatsby'
import { Image, ImageSpacer } from './Image'
import { LinkText } from '../Text'
import { BlogTitle, BlogContentWrap, BlogExerpt } from './Content'

type PostProps = {
  imageSrc?: string,
  title?: string,
  slug: string,
  blurb?: string,
}

const PostWrap = styled.li`
  ${undoBodyWrap};
  margin-top: 1rem;
  margin-bottom: 1rem;
  position: relative;
  list-style: none;
`

const Post = ({ imageSrc, title, slug, blurb }: PostProps) => (
  <PostWrap>
    <ImageSpacer>
      <Link to={`/blog/${slug}`}>
        <Image src={imageSrc} />
      </Link>
      <BlogTitle>
        <Link to={`/blog//${slug}`}>{title}</Link>
      </BlogTitle>
    </ImageSpacer>
    <BlogContentWrap>
      <BlogExerpt dangerouslySetInnerHTML={{ __html: blurb }} />
      <LinkText to={`/blog//${slug}`}>Read More</LinkText>
    </BlogContentWrap>
  </PostWrap>
)

export default Post
