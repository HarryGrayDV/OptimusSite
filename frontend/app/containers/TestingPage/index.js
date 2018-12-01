import React from 'react';
import styled from 'styled-components';

const TestingSt = styled.div`
  h1,
  h2,
  h3,
  .heading {
    font-family: 'Playfair display', serif;
  }

  background-color: #f8f4f0;
  min-height: 100vh;
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
  box-shadow: 0 2px 64px 0 rgba(0, 0, 0, 0.1);
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

// const ButtonSt = styled.button`
//   color: #fff;
//   background-color: #777;
//   padding: 12px;
// `;

export default class TestingPage extends React.PureComponent {
  constructor() {
    super();

    this.labels = [
      'BUY NOW',
      'PURCHASE',
      'ADD TO CART',
      'ADD TO BASKET',
      'GET FLAQUE',
    ];

    this.state = {
      position: this.randomBetween(0, 1),
      text: this.labels[this.randomBetween(0, this.labels.length - 1)],
    };
  }

  randomBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  render() {
    const { position, text } = this.state;

    return (
      <TestingSt>
        <MenuSt>
          <svg width="42" height="24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 0h42v4H0V0zm0 10h42v4H0v-4zm0 10h42v4H0v-4z"
              fill="#8C2626"
              fillRule="evenodd"
            />
          </svg>
          <LogoSt>
            <span>la</span>
            <span className="heading">Flaque</span>
          </LogoSt>
        </MenuSt>
        <main>
          <div className="hero">
            <h1>BMW 330i</h1>
            <p>Oh what a bloody beauty. I bet you want it.</p>
          </div>
          <div className="info">
            <p>
              Built with pure elegance at its core, the e45 BMW 330i is a
              monster, a machine, a matriarch, and a bloody beast of a bastard
            </p>
            <p>
              Don't you try and tell me this concept doesn't tickle you right in
              the bloody pickle because I won't flipping believe you.
            </p>
          </div>
          <div className="three">
            <div>Yeah you know I'm going to do it - no 'ragrets' ya know</div>
            <div>Can you believe how unique this pattern is? I can't.</div>
            <div>Three is a magic number and you feel the spiritual energy</div>
          </div>
        </main>
      </TestingSt>
    );
  }
}
