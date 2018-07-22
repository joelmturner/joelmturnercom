import React, { Component } from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import Layout from '../components/layout'
import { Divide } from '../../node_modules/styled-icons/fa-solid';

// New stuff
import styled, {css} from 'styled-components';
import { sharedFontStyles } from '../designSystem';
import { PostEntryContainer, ImageSpacer, Image, BlogTitle, BlogBlurb, BlogContentWrap, TextLink, getNewImage } from '../components/molecules/BlogItem';
import { ThemeProvider } from 'styled-components';
import theme from '../theme/theme'; 

class IndexPage extends Component {
  render() {
    const posts = this.props.data.allWordpressPost.edges
    const pages = this.props.data.allWordpressPage.edges

    console.group('indexPage');
    console.log('posts', posts)
    console.log('pages', pages)
    console.groupEnd();
    
    return ( 
        <ThemeProvider theme={theme}> 
            <Layout title='Joel M Turner'> 
                <h2>Posts</h2> 
                
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
                
                {/* Joel, i'm leaving this here so you know where they went. Feel free to delete it */}
                <hr />
                <h2>Pages</h2>
                <Link to="/page-2">The wp pages index has moved</Link>
                
            </Layout> 
        </ThemeProvider> 
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
