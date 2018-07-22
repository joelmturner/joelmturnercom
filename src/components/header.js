import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import Avatar from './atoms/Avatar'
import Helmet from 'react-helmet'
import { Textfit } from 'react-textfit'
import SocialLink, { SocialLinkWrap } from './molecules/SocialLink'
import { SocialIcons } from './molecules/Header'
import { Twitter, Github, Instagram } from 'styled-icons/fa-brands/'
import Column from './Grid/Column'
import Row from './Grid/Row'

const HeaderWrap = styled.header`
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.21);
  padding: 1rem;

  h1,
  h1 a {
    font-size: 2rem;
    color: ${({theme}) => theme.colors.navy};
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
    {slug && (
      <>
        <Row>
          <Column span={11}>
            <h1 style={{ margin: 0 }}>
              <Link to={`/${slug}`}>
                <Textfit mode="single" forceSingleModeWidth={false}>{title}</Textfit>
              </Link>
            </h1>
          </Column>
          <Column span={1} right>
            <Avatar url="https://res.cloudinary.com/joelmturner/image/upload/v1532201643/joel-turner-headshot-web_xyix1w.jpg" />
          </Column>
        </Row>
      </>
    )}
    {!slug && (
      <>
        <Row>
          <Column span={1}>
            <Avatar
              size="l"
              url="https://res.cloudinary.com/joelmturner/image/upload/v1532201643/joel-turner-headshot-web_xyix1w.jpg"
            />
          </Column>
          <Column span={11} right middle>
            <SocialIcons>
              {social.map(x => (
                <SocialLink key={x.network} href={x.link}>
                  {x.network === 'instagram' && <Instagram size={24} />}
                  {x.network === 'twitter' && <Twitter size={24} />}
                  {x.network === 'github' && <Github size={24} />}
                </SocialLink>
              ))}
            </SocialIcons>
          </Column>
        </Row>
      </>
    )}
  </HeaderWrap>
)

export default Header
