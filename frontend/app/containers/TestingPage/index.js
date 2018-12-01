import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';

const TestingSt = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1000px;
  margin: 32px auto;
  align-items: end;

  main,
  aside {
    background-color: #fff;
    margin: 12px;
    padding: 24px;
  }

  h1,
  h4 {
    margin-top: 0;
  }

  main {
    width: 70%;
  }

  aside {
    width: 30%;
  }
`;

const ButtonSt = styled.button`
  color: #fff;
  height: ${props => props.height}px;
  width: ${props => props.width}%;
  background-color: hsl(
    ${props => `
      ${props.backgroundColor.h}, ${props.backgroundColor.s}%,
      ${props.backgroundColor.l}%
    `}
  );
`;

/* eslint-disable react/prefer-stateless-function */
export default class TestingPage extends React.PureComponent {
  constructor() {
    super();

    this.labels = [
      'Click here',
      'Sign up',
      'Get involved!',
      'Newsletter sign up',
      'Please click me',
      'Enter your email',
    ];

    this.state = {
      position: this.randomBetween(0, 11),
      height: this.randomBetween(40, 200),
      width: this.randomBetween(40, 100),
      color: {
        h: this.randomBetween(0, 360),
        s: this.randomBetween(0, 100),
        l: this.randomBetween(0, 100),
      },
      text: this.labels[this.randomBetween(0, this.labels.length - 1)],
    };
  }

  randomBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  render() {
    const { position, width, height, color, text } = this.state;

    return (
      <>
        <Header generic>
          <span>Testing page</span>
          {position === 11 && (
            <ButtonSt
              type="button"
              width={width}
              height={height}
              backgroundColor={color}
            >
              {text}
            </ButtonSt>
          )}
        </Header>
        <TestingSt>
          <aside>
            <h4>Testing as well</h4>
            {position === 0 && (
              <ButtonSt
                type="button"
                width={width}
                height={height}
                backgroundColor={color}
              >
                {text}
              </ButtonSt>
            )}
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            {position === 1 && (
              <ButtonSt
                type="button"
                width={width}
                height={height}
                backgroundColor={color}
              >
                {text}
              </ButtonSt>
            )}
            <p>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
            {position === 2 && (
              <ButtonSt
                type="button"
                width={width}
                height={height}
                backgroundColor={color}
              >
                {text}
              </ButtonSt>
            )}
            <p>
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
            {position === 3 && (
              <ButtonSt
                type="button"
                width={width}
                height={height}
                backgroundColor={color}
              >
                {text}
              </ButtonSt>
            )}
            <p>
              It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages.
            </p>
            {position === 4 && (
              <ButtonSt
                type="button"
                width={width}
                height={height}
                backgroundColor={color}
              >
                {text}
              </ButtonSt>
            )}
          </aside>
          <main>
            <h1>Test</h1>
            {position === 5 && (
              <ButtonSt
                type="button"
                width={width}
                height={height}
                backgroundColor={color}
              >
                {text}
              </ButtonSt>
            )}
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            {position === 6 && (
              <ButtonSt
                type="button"
                width={width}
                height={height}
                backgroundColor={color}
              >
                {text}
              </ButtonSt>
            )}
            <p>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
            {position === 7 && (
              <ButtonSt
                type="button"
                width={width}
                height={height}
                backgroundColor={color}
              >
                {text}
              </ButtonSt>
            )}
            <p>
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
            {position === 8 && (
              <ButtonSt
                type="button"
                width={width}
                height={height}
                backgroundColor={color}
              >
                {text}
              </ButtonSt>
            )}
            <p>
              It was popularised when an unknown printer took a galley of type
              and scrambled it to make a type specimen book.
            </p>
            {position === 9 && (
              <ButtonSt
                type="button"
                width={width}
                height={height}
                backgroundColor={color}
              >
                {text}
              </ButtonSt>
            )}
            <p>
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
            {position === 10 && (
              <ButtonSt
                type="button"
                width={width}
                height={height}
                backgroundColor={color}
              >
                {text}
              </ButtonSt>
            )}
            <p>
              It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages.
            </p>
          </main>
        </TestingSt>
      </>
    );
  }
}
