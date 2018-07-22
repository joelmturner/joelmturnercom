import React, { Component } from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

import Layout from '../components/layout'
import { Divide } from '../../node_modules/styled-icons/fa-solid';

// New stuff
import styled, {css} from 'styled-components';
import { sharedFontStyles } from '../designSystem';
import { PostEntryContainer, ImageSpacer, Image, BlogTitle, BlogBlurb, BlogContentWrap, TextLink, getNewImage } from '../components/molecules/BlogItem';

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
