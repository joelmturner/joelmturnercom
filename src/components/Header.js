// @flow
import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import styled, { type ReactComponentStyled } from 'styled-components'
import Helmet from 'react-helmet'
import { Textfit } from 'react-textfit'
import SocialLink, { SocialLinkWrap } from './SocialLink'
import { Twitter, Github, Instagram } from 'styled-icons/fa-brands/'
import {Column, Row, Flexbox} from '../designSystem'
import { type Social } from './layout'
import type { Theme } from '../designSystem/theme'

type HeaderProps = {
  title: string,
  slug: string,
  social: Social[],
  mini: boolean,
  onToggleTheme: () => void,
  theme?: Theme,
}

type HeaderWrapProps = {
  theme: Theme,
  home: string,
}

const SocialIcons = styled(Flexbox)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  > ${SocialLinkWrap} {
    margin-right: 1rem;
    &:last-child {
      margin-right: 0;
    }
  }
`

const HeaderWrap: ReactComponentStyled<HeaderWrapProps> = styled.header`
  /* background: ${({ theme }: HeaderWrapProps) => theme.header.default.background}; */
  box-shadow: 0 5px 5px -5px ${({ theme }: HeaderWrapProps) => theme.header.default.boxShadow};
  padding: 1rem;
  margin-bottom: 0.5rem;
  grid-area: header;
  h1,
  h1 a {
    color: ${({ theme }: HeaderWrapProps) => theme.copy.h1};
    font-family: 'Source Sans Pro', sans-serif;
  }
`
const StyledSvg = styled.svg`
  width: 24px;
  height: 24px;
  margin-right: 1em;
  cursor: pointer;
  &:hover {
    path {
      fill: ${({ theme }: HeaderWrapProps) => theme.copy.hover.fill};
    }
  }
  path {
    fill: ${({ theme }: HeaderWrapProps) => theme.copy.default.fill};
  }
`

const sizer = size => {
    let sized
    switch (size) {
      default:
      case 's':
        sized = '2rem'
        break
      case 'l':
        sized = '8rem'
        break
    }
    return sized
  }
  
  const Avatar = styled.div`
      background-image: url('${({ url }) => url}');
      background-size: cover;
      border-radius: 50%;
      width: ${({ size }) => sizer(size)};
      height: ${({ size }) => sizer(size)};
  `

const ThemeToggle = ({ onClick }) => (
  <StyledSvg
    onClick={onClick}
    width="100%"
    height="100%"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink">
    <path
      d="M17.39 15.14A7.33 7.33 0 0 1 11.75 1.6c.23-.11.56-.23.79-.34a8.19 8.19 0 0 0-5.41.45 9 9 0 1 0 7 16.58 8.42 8.42 0 0 0 4.29-3.84 5.3 5.3 0 0 1-1.03.69z"
      fill="#fff"
    />
  </StyledSvg>
)

const Header = ({ title, slug, social, mini, onToggleTheme }: HeaderProps) => (
  <HeaderWrap home={slug}>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    {slug && (
      <Fragment>
        <Flexbox>
          <Flexbox middle>
            <h1 style={{ margin: 0 }}>
              <Link to={`/`}>{`<`}</Link>
            </h1>
            <h1 style={{ margin: '0 .5rem', maxWidth: 'calc(100% - 108px)' }}>
              <Link to={`/${slug}`}>
                <Textfit min={20} max={32} mode="single">
                  {title}
                </Textfit>
              </Link>
            </h1>
          </Flexbox>
          <SocialIcons middle right noGrow>
            <ThemeToggle onClick={onToggleTheme} />
            {social.map((x: Social) => (
              <SocialLink key={x.network} href={x.link}>
                {x.network === 'instagram' && <Instagram size={24} />}
                {x.network === 'twitter' && <Twitter size={24} />}
                {x.network === 'github' && <Github size={24} />}
              </SocialLink>
            ))}
          </SocialIcons>
        </Flexbox>
      </Fragment>
    )}
    {!slug && (
      <Fragment>
        <Row>
          <Column span={1}>
            <Avatar
              size={mini ? 's' : 'l'}
              url="https://res.cloudinary.com/joelmturner/image/upload/v1532201643/joel-turner-headshot-web_xyix1w.jpg"
            />
          </Column>
          <Column span={11} right middle>
            <SocialIcons>
              <ThemeToggle onClick={onToggleTheme} />
              {social.map((x: Social) => (
                <SocialLink key={x.network} href={x.link}>
                  {x.network === 'instagram' && <Instagram size={24} />}
                  {x.network === 'twitter' && <Twitter size={24} />}
                  {x.network === 'github' && <Github size={24} />}
                </SocialLink>
              ))}
            </SocialIcons>
          </Column>
        </Row>
      </Fragment>
    )}
  </HeaderWrap>
)

export default Header
