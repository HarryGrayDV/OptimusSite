import styled from 'styled-components';
import { media } from '../../global-styles';

const TestingSt = styled.div`
  background-color: #f8f4f0;
  min-height: 100vh;

  ${media.phone`
    position: relative;
    overflow-x: hidden;
  `};

  h1,
  h2,
  h3,
  .heading {
    font-family: 'Playfair display', serif;
  }

  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: -128px;

    ${media.phone`
      flex-direction: column;
      margin: 0;
    `};
  }

  main {
    margin: 0 auto;
    max-width: 960px;

    ${media.phone`
      padding: 24px;
    `};
  }

  .product {
    display: flex;
    flex-direction: column;

    ${media.phone`
      img {
        position: relative;
        z-index: 1;
        max-width: 100%;
      }
    `};
  }

  .info {
    width: 380px;
    margin-left: 128px;
    font-weight: 300;

    ${media.phone`
      margin: 0;
      width: 100%;
      padding: 24px;
    `};

    h1 {
      font-size: 52px;
      margin-top: -12px;
      margin-bottom: 32px;
    }

    > span {
      font-size: 24px;
      font-style: italic;
    }

    strong {
      font-weight: bold;
    }

    .rating {
      margin-bottom: 64px;
    }

    .price {
      display: block;
      font-style: italic;
      font-weight: 300;
      margin: 32px 0 64px;
      font-size: 18px;
    }
  }

  .journey {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 120px;

    ${media.phone`
      display: none;
    `};
  }

  .stroke {
    position: absolute;
    z-index: 0;

    &.stroke1 {
      right: 12px;
      top: 0;
    }

    &.stroke2 {
      bottom: 0;
      left: 12px;
    }
  }
`;

const MenuSt = styled.div`
  position: relative;
  width: 200px;
  height: 128px;
  display: flex;
  flex-direction: row;
  padding: 0 34px;
  background-color: #fff;
  align-items: center;
  z-index: 1;
  box-shadow: 0 2px 64px 0 rgba(0, 0, 0, 0.25);
`;

const LogoSt = styled.div`
  position: absolute;
  right: -78px;

  span:not(.heading) {
    position: absolute;
    top: -8px;
    left: -6px;
    font-size: 22px;
  }

  .heading {
    font-size: 52px;
    font-weight: bold;
  }
`;

const ButtonSt = styled.button`
  color: #fff;
  background-color: #8c2626;
  padding: 32px;
  position: relative;
  z-index: 1;
  display: block;
`;

export { TestingSt, MenuSt, LogoSt, ButtonSt };
