import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components';
import Avatar from './Avatar/Avatar';
import Helmet from 'react-helmet'
import { Textfit } from 'react-textfit';

const HeaderWrap = styled.div`
    height: 3rem;
    display: grid;
    grid-template-columns: 11fr 1fr;
    align-items: center;
    justify-items: right;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.21);
    padding: 0 1rem;

    h1,
    h1 a {
        font-size: 2rem;
        color: #1d3654;
        justify-self: left;
        font-family: 'Source Sans Pro', sans-serif;
    }
`;

const Header = ({ title, slug }) => (
    <HeaderWrap>
        <Helmet
            title={title}
            meta={[
                { name: 'description', content: 'Sample' },
                { name: 'keywords', content: 'sample, something' },
            ]}
        />
        <h1 style={{ margin: 0 }}>
            <Link to={`/${slug}`} >
                <Textfit mode="single">
                    {title}
                </Textfit>
            </Link>
        </h1>
        <Avatar url='https://pbs.twimg.com/profile_images/884893177995513856/cpkVG9oK_bigger.jpg' />
    </HeaderWrap>
)

export default Header
