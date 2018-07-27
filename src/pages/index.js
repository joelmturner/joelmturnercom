import React, { Component } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import BlogItem, { TextLink } from '../components/molecules/BlogItem';
import Section from '../components/atoms/Section';
import {H1, H4, Body} from '../components/atoms/Text.js';

class IndexPage extends Component {
  
  state = {
    allPosts: false,
    showAllPosts: () => {
      this.setState({
        allPosts: true
      })
    }
  }

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
            const imageUrl = post.node.featured_media.source_url;
            return <BlogItem key={id} title={title} slug={slug} blurb={fakeBlurb} imageSrc={imageUrl} />
          })}

          { !this.state.allPosts
            ? <H1 onClick={this.state.showAllPosts}>Show All Posts</H1>
            : <H1 onClick={this.state.showAllPosts}>Hide All Posts</H1>
          }

          {/* 
          Show More
          // rest of the posts
          posts.slice(3)
            */
            this.state.allPosts && <h2>SHOW ALL THE POSTS</h2>
          }
          

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

