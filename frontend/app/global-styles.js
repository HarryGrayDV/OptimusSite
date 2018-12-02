import { css, createGlobalStyle } from 'styled-components';

const colors = {
  primary: '#4CBBD2',
  primaryGradient:
    'linear-gradient(135deg, #3EACCE 0%, #5ACAD5 53%, #49CAC3 100%)',
  secondary: '#8ABAC4',
  tertiary: '#483547',
};

const sizes = {
  projector: 1024,
  desktop: 992,
  tablet: 768,
  phone: 576,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Muli', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  button {
    appearance: none;
    cursor: pointer;
    font-family: inherit;
  }

  #app {
    background-color: #e0e0e0;
    min-height: 100%;
    min-width: 100%;
  }
`;

export { GlobalStyle, colors, media };
