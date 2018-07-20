import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from "gatsby"
import {Twitter, Github, Instagram} from 'styled-icons/fa-brands/';

import './layout.css'
import {Box, Flex, Heading} from 'rebass';

import styled, {css} from 'styled-components';
import SocialLink, { SocialLinkWrap } from './molecules/SocialLink/SocialLink';

const blue = '#30747D';

const bodyWrapperStyles = () => css`
  padding: 0 2rem;
`

const Avatar = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-size: cover;
  background-color: pink;
  background-image: url('https://placekitten.com/g/128');
`;

const Icon = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 5px;
  border: 1px solid green;
`;

const Header = styled.header`
  padding: 2.5rem 2rem 0;
  
  /* debug */
  background-color: '#efefef';
`;

const HeaderInternal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const SocialIcons = styled.div`
  display: flex;
  > ${SocialLinkWrap} {
    margin-right: 1rem;
    &:last-child { margin-right: 0; }
  }
`

const sharedFontStyles = () => css`
  font-family: 'Source Sans Pro', sans-serif;
`

const Text1 = styled.h1`
  ${sharedFontStyles()}
  font-size: 24px;
  font-weight: bold;
  line-height: 2rem;
  margin: 0;
  font-family: 'Source Sans Pro', sans-serif;
`;

const Text2 = styled.h4`
  ${sharedFontStyles()}
  font-size: 0.75rem;
  line-height: 1.125rem;
  margin: 0;
`

const BodyText = styled.p`
  ${sharedFontStyles()};
`;



const BodyWrapper = styled.div`
  /* Debug Styles */
  ${ ({debug}) => debug && css`
    border: 1px solid blue;
  `}
`

const InfoSection = styled.div`
  ${bodyWrapperStyles()};
`;

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
      console.log('about', aboutData);

      console.log('data', data);
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
          <Twitter />
          <Instagram />
          <Github size={24}/>
          {/* Header Bar */}
          <HeaderInternal>
            <Avatar />
            <SocialIcons>
                {false && socialData.map(x => (
                  <SocialLink 
                    key={x.network} 
                    href={x.link} 
                    icon={x.network} 
                    />
                ))}
                
                <SocialLink href={socialData[1].link}>
                  <Instagram size={24} />
                </SocialLink>
                <SocialLink href={socialData[0].link}>
                  <Twitter size={24} />
                </SocialLink>
                <SocialLink href={socialData[2].link}>
                  <Github size={24} />
                </SocialLink>
            </SocialIcons>
          </HeaderInternal>
          
        </Header>
        
        {/* Info // move this to the index page */}
        <InfoSection>
          <Text1>{aboutData.name}</Text1>
          <Text2>Frontend Developer {aboutData.title}</Text2>
          {/* {aboutData.bio.map((x, i) => <Body key={i}>{x}</Body>)} */}
          <BodyText>{aboutData.bio}</BodyText>
        </InfoSection>

        <Box px={4} py={5} color='white' bg='blue'>
            <Heading
                is='h1'
                fontSize={[ 4, 5, 6 ]}>
                {data.site.siteMetadata.title}
            </Heading>
        </Box>
        <Flex
            px={4}
            py={5}
            flexDirection='column' >
              before child
                {children}
                after child
        </Flex>
      </>
    )}}
  </StaticQuery>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
