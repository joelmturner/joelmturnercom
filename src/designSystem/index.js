import styled, { css } from 'styled-components';

// Theme Placeholder
export const colors = {
    navy: '#1D3654',
    gold: '#CA9874'
};

// Reusable Style Functions
export const themeHover = () => css`
  fill: ${colors.navy};
  color: ${colors.navy};
  
  &:hover {
    fill: ${colors.gold};
    color: ${colors.gold};
  }
`;

export const sharedFontStyles = () => css`
  font-family: 'Source Sans Pro', sans-serif;
`;

export const bodyWrapperStyles = () => css`
  padding: 0 1rem;
`;