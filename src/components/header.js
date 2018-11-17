// @flow
import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Avatar from './atoms/Avatar'
import Helmet from 'react-helmet'
import { Textfit } from 'react-textfit'
import SocialLink from './molecules/SocialLink'
import { SocialIcons } from './molecules/Header'
import { Twitter, Github, Instagram } from 'styled-icons/fa-brands/'
import Column from './Grid/Column'
import Row from './Grid/Row'
import { type Social } from './layout'
import { type Theme } from '../designSystem/theme'
import Flexbox from '../components/Flexbox'

type HeaderProps = {
  title: string,
  slug: string,
  social: Social[],
  mini: boolean,
  theme?: Theme,
}

const HeaderWrap = styled.header`
  box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.21);
  padding: 1rem;
  margin-bottom: 0.5rem;
  grid-area: header;
  h1,
  h1 a {
    color: ${({ theme }: HeaderProps) => theme && theme.colors.navy};
    font-family: 'Source Sans Pro', sans-serif;
  }
`

const Header = ({ title, slug, social, mini }: HeaderProps) => (
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
