import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import Avatar from './atoms/Avatar'
import Helmet from 'react-helmet'
import { Textfit } from 'react-textfit'
import SocialLink, { SocialLinkWrap } from './molecules/SocialLink'
import { SocialIcons } from './molecules/Header'
import { Twitter, Github, Instagram } from 'styled-icons/fa-brands/'

const HeaderWrap = styled.div`
  display: grid;
  grid-template-columns: ${({ slug }) => (slug ? '11fr 1fr' : '1fr 11fr')};
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
    {console.log('slug', slug)}
    {slug && (
      <>
        <h1 style={{ margin: 0 }}>
          <Link to={`/${slug}`}>
            <Textfit mode="single">{title}</Textfit>
          </Link>
        </h1>
        <Avatar url="https://res.cloudinary.com/joelmturner/image/upload/v1532201643/joel-turner-headshot-web_xyix1w.jpg" />
      </>
    )}
    {!slug && (
      <>
        <Avatar
          size="l"
          url="https://res.cloudinary.com/joelmturner/image/upload/v1532201643/joel-turner-headshot-web_xyix1w.jpg"
        />
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
