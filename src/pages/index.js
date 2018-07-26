import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import { PostEntryContainer, ImageSpacer, Image, BlogTitle, BlogBlurb, BlogContentWrap, TextLink, getNewImage } from '../components/molecules/BlogItem';
import Section from '../components/atoms/Section';
import {H1, H4, Body} from '../components/atoms/Text.js';

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

      <Layout title='Joel M Turner' name="layout"> 
      
        <Section title="About">
          <H1>{name}</H1>
          <H4>{title}</H4>
          <Body>Not to be confused with Joel Turner, the rather talented, Australian beat-boxer.</Body>
          <Body>I spent many of my summers living on glaciers in Alaska.Living in a remote camp with a bunch of other interesting people was great.You never know where the conversations will go and what kind of friends you’ll make.</Body>
          <Body>I received my BA with a graphic design emphasis in December of 2005. Most of my free time in college was spent playing in the Symphony Orchestra and playing basketball.</Body>
          <Body>I was born in Laramie, Wyoming.I now live with my wife, Suzanne Turner and our two dogs in Portland, Oregon.</Body>
        </Section>

        <Section title="Posts">
          <H1>Writing</H1>
          <H4>Some Tagline Here</H4>
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
          featured_media {
              id
              source_url
          }
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

