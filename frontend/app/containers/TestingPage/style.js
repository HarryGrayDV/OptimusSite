import styled from 'styled-components';

const TestingSt = styled.div`
  background-color: #f8f4f0;
  min-height: 100vh;

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
  }

  main {
    margin: 0 auto;
    max-width: 960px;
  }

  .product {
    display: flex;
    flex-direction: column;
  }

  .info {
    width: 380px;
    margin-left: 128px;
    font-weight: 300;

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
`;

export { TestingSt, MenuSt, LogoSt, ButtonSt };
