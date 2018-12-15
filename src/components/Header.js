// @flow
import * as React from 'react'
import { Link } from 'gatsby'
import styled, { type ReactComponentStyled } from 'styled-components'
import Helmet from 'react-helmet'
import { Textfit } from 'react-textfit'
import SocialLink from './SocialLink'
import { Twitter, Github, Instagram } from 'styled-icons/fa-brands/'
import { Row, Flexbox } from '../designSystem'
import { type Social } from './layout'
import type { Theme } from '../designSystem/theme'

type HeaderProps = {
  title: string,
  slug: string,
  social: Social[],
  onToggleTheme: () => void,
  theme?: Theme,
}

type HeaderWrapProps = {
  theme: Theme,
  home: string,
}

const SocialIcons = styled(Row)`
  grid-template-columns: repeat(4, minmax(24px, 1fr));
`

const HeaderWrap: ReactComponentStyled<HeaderWrapProps> = styled.header`
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
  width: 27px;
  height: 24px;
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

const Header = ({ title, slug, social, onToggleTheme }: HeaderProps) => (
  <HeaderWrap>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
        {
          name: 'google-site-verification',
          content: 'xDIWeoSnDYkLawGGNOSQCzU5-38M7mwXUV-UbgW6ktc',
        },
      ]}
    />
    <Flexbox>
      <Flexbox middle>
        <h1 style={{ margin: 0 }}>
          <Link to={`/`}>
            <Textfit min={20} max={28} mode="single">
              {!slug ? 'Howdy' : 'Joel M Turner'}
            </Textfit>
          </Link>
        </h1>
      </Flexbox>
      <SocialIcons gap=".25em" maxColumns={4}>
        <StyledSvg
          onClick={onToggleTheme}
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
        {social.map((x: Social) => (
          <SocialLink key={x.network} href={x.link}>
            {x.network === 'instagram' && <Instagram size={24} />}
            {x.network === 'twitter' && <Twitter size={24} />}
            {x.network === 'github' && <Github size={24} />}
          </SocialLink>
        ))}
      </SocialIcons>
    </Flexbox>
  </HeaderWrap>
)

export default Header
