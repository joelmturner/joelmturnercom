import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"
import {Twitter, Github, Instagram} from 'styled-icons/fa-brands/';
import './layout.css'
import {Box, Flex, Heading} from 'rebass';
import styled, {css} from 'styled-components';
import Header, {SocialIcons} from './molecules/Header';
import Avatar from './atoms/Avatar';
import SocialLink, { SocialLinkWrap } from './molecules/SocialLink';
import { Text1, Text2, BodyText } from './atoms/Text.js';
import {bodyWrapperStyles} from '../designSystem';
import Section from './atoms/Section';

const Layout = ({ children, data }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            about {
              name
              bio
            }
            social {
              network
              link
            }
          }
        }
      }
    `}>
    {data => {
      const { about: aboutData, social: socialData } = data.site.siteMetadata;
      const { name, title, bio } = aboutData;
      return (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />

        <Header>
            <Avatar />
            <SocialIcons>
                {socialData.map(x => (
                  <SocialLink 
                    key={x.network} 
                    href={x.link} 
                    // icon={x.network} 
                    >
                    {x.network === 'instagram' && <Instagram size={24} />}
                    {x.network === 'twitter' && <Twitter size={24} />}
                    {x.network === 'github' && <Github size={24} />}
                  </SocialLink>
                ))}
            </SocialIcons>
        </Header>
        
        {/* Info // move this to the index page */}
        <Section>
          <Text1>{aboutData.name}</Text1>
          <Text2>Frontend Developer {aboutData.title}</Text2>
          <BodyText>{aboutData.bio}</BodyText>
        </Section>
        
        <Flex
            px={4}
            py={5}
            flexDirection='column' 
            style={{ borderTop: '10px solid blue'}}>
                {children}
        </Flex>
      </>
    )}}
  </StaticQuery>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
