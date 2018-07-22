import React, { Component } from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

import Layout from '../components/layout'
import { Divide } from '../../node_modules/styled-icons/fa-solid';

// New stuff
import styled, {css} from 'styled-components';
import { sharedFontStyles } from '../designSystem';




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
  const r = Math.round(Math.random()*100);
  return `https://picsum.photos/${d+r}/?random`
}


class IndexPage extends Component {
  render() {
    const posts = this.props.data.allWordpressPost.edges
    const pages = this.props.data.allWordpressPage.edges
    console.group('indexPage');
    console.log('posts', posts[0])
    console.log('posts', posts)
    console.log('pages', pages)
    console.groupEnd();
    return (
      <Layout>
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>

        <h2>Pages</h2>
        
        {posts && posts[0] && (
          
          <PostEntryContainer>
            <ImageSpacer>
              <Image src={getNewImage()}/>
              <BlogTitle>{posts[0].node.title}</BlogTitle>
            </ImageSpacer>
            <BlogContentWrap>
              <BlogBlurb>
                Listicle aesthetic mixtape umami kombucha schlitz farm-to-table, street art organic crucifix truffaut chambray deep v fam pork belly. Four loko chillwave hexagon organic, narwhal single-origin coffee everyday carry disrupt vaporware humblebrag. Tofu cred venmo, health goth live-edge cronut air plant tumblr locavore meggings quinoa edison bulb kinfolk kale chips single-origin coffee. Keffiyeh gentrify authentic, franzen blog letterpress 8-bit tilde. Kale chips kogi cardigan DIY, man braid swag actually tbh palo santo portland chia.
              </BlogBlurb>
              <TextLink>Read More</TextLink>
            </BlogContentWrap>
          </PostEntryContainer>
        )}

        <div style={{
          background: 'red',
          width: '100%',
          paddingTop: '56.25%'
          
        }}>
          hi
        </div>
        

        
        {pages && pages.map(page => (
            <li key={page.node.id}>
              <Link to={`/${page.node.slug}`}>{page.node.title}</Link>
              
            </li>
          ))}
        <h2>Posts</h2>
        {posts && posts.map(post => (
            <li key={post.node.id}>
              <Link to={`/${post.node.slug}`}>{post.node.title}</Link>
            </li>
        ))}
        <hr/>
        {posts && posts.map(post => {
          const {id, title, slug} = post.node;
          return (
            <PostEntryContainer key={post.node.id}>
              <ImageSpacer>
                <Image src={getNewImage()} />
                <BlogTitle>{title}</BlogTitle>
              </ImageSpacer>
              <BlogContentWrap>
                <BlogBlurb>
                  Listicle aesthetic mixtape umami kombucha schlitz farm-to-table, street art organic crucifix truffaut chambray deep v fam pork belly. Four loko chillwave hexagon organic, narwhal single-origin coffee everyday carry disrupt vaporware humblebrag. Tofu cred venmo, health goth live-edge cronut air plant tumblr locavore meggings quinoa edison bulb kinfolk kale chips single-origin coffee. Keffiyeh gentrify authentic, franzen blog letterpress 8-bit tilde. Kale chips kogi cardigan DIY, man braid swag actually tbh palo santo portland chia.
                </BlogBlurb>
                <TextLink to={`/${slug}`}>Read More</TextLink>
              </BlogContentWrap>
            </PostEntryContainer>
        )})}
      </Layout>
    )
  }
}

export default IndexPage

export const pageQuery = graphql`
  {
    allWordpressPost {
      edges {
        node {
          id
          slug
          status
          template
          format
          title
        }
      }
    }
    allWordpressPage {
      edges {
        node {
          id
          slug
          status
          template
          title
        }
      }
    }
  }
`
