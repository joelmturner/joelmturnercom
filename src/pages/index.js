import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import { PostEntryContainer, ImageSpacer, Image, BlogTitle, BlogBlurb, BlogContentWrap, TextLink, getNewImage } from '../components/molecules/BlogItem';
import { ThemeProvider } from 'styled-components';
import theme from '../theme/theme'; 
import Section from '../components/atoms/Section';
import {Text1, Text2, BodyText} from '../components/atoms/Text.js';

class IndexPage extends Component {
  render() {
    const data = this.props.data;
    const { name, title, bio } = data.site.siteMetadata.about;
    const posts = this.props.data.allWordpressPost.edges

    console.group('indexPage');
    console.log('data', data);
    console.log('posts', posts);
    console.groupEnd();
    
    return ( 
        <ThemeProvider theme={theme}> 
            <Layout title='Joel M Turner' name="layout"> 
            
              <Section title="About">
                <Text1>{name}</Text1>
                <Text2>{title}</Text2>
                <BodyText>{bio}</BodyText>
              </Section>

              <Section title="Posts">
                <h2>Posts</h2> 
                {posts && posts.slice(0,3).map(post => {
                  const {id, title, slug} = post.node;
                  return (
                    <PostEntryContainer key={id}>
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
                {/* 
                Show More
                // rest of the posts
                posts.slice(3)
                 */}

              </Section>
                
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
    site {
      siteMetadata {
        title
        about {
          name
          title
          bio
        }
      }
    }
  }
`;

