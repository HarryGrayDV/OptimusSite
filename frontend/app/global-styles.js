import { createGlobalStyle } from 'styled-components';

const colors = {
  primary: '#4CBBD2',
  primaryGradient:
    'linear-gradient(-135deg, #3EACCE 0%, #5ACAD5 53%, #49CAC3 100%)',
  secondary: '#8ABAC4',
  tertiary: '#483547',
};

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
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
`;

export { GlobalStyle, colors };
