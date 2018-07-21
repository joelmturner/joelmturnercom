import React from 'react'
import { Link } from 'gatsby'
import styled, {css} from 'styled-components'
import Avatar from './atoms/Avatar'
import Helmet from 'react-helmet'
import { Textfit } from 'react-textfit'
import SocialLink, { SocialLinkWrap } from './molecules/SocialLink'
import {SocialIcons} from './molecules/Header'
import { Twitter, Github, Instagram } from 'styled-icons/fa-brands/'

const HeaderWrap = styled.header`
  display: grid;
  grid-template-columns: 11fr 1fr;
  align-items: center;
  justify-items: right;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.21);
  padding: 1rem;

  h1,
  h1 a {
    font-size: 2rem;
    color: #1d3654;
    justify-self: left;
    font-family: 'Source Sans Pro', sans-serif;
  }

  /* Home page */
  ${({slug}) => !slug && css`
    grid-template-columns: 1fr 11fr;
    ${Avatar} {
        justify-self: left;
    }
  `}
`

const Header = ({ title, slug, social }) => (
  <HeaderWrap home={slug}>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    {slug && (
      <>
        <h1 style={{ margin: 0 }}>
          <Link to={`/${slug}`}>
            <Textfit mode="single">{title}</Textfit>
          </Link>
        </h1>
        <Avatar url="https://pbs.twimg.com/profile_images/884893177995513856/cpkVG9oK_bigger.jpg" />
      </>
    )}
    {!slug && (
      <>
        <Avatar size="l" url="https://pbs.twimg.com/profile_images/884893177995513856/cpkVG9oK_bigger.jpg" />
        <SocialIcons>
          {social.map(x => (
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
      </>
    )}
  </HeaderWrap>
)

export default Header
