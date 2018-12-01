import React from 'react';
import rating from '../../images/rating.svg';
import product from '../../images/product.png';
import journey from '../../images/journey.png';
import stroke1 from '../../images/stroke-1.png';
import stroke2 from '../../images/stroke-2.png';
import { TestingSt, MenuSt, LogoSt, ButtonSt } from './style';

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
          <div className="container">
            <div className="product">
              <img alt="La Flaque de Boue" src={product} />
              {position === 1 && <ButtonSt type="button">{text}</ButtonSt>}
            </div>
            <div className="info">
              <span>La Flaque</span>
              <h1>de boue</h1>
              <div className="rating">
                <img src={rating} alt="Rating" />
              </div>
              <p>
                Experience true freshness with La Flaque’s flagship new flavour
                - &nbsp;
                <strong>de boue</strong>.
              </p>
              <p>
                Stirring up dreamy memories of Parisian summers,&nbsp;
                <strong>de boue</strong> hits the perfect spot between fizz and
                flavour.
              </p>
              <p>
                You’d be a <strong>‘fou’</strong> to miss it.
              </p>
              <span className="price">$2.40 / can</span>
              {position === 0 && <ButtonSt type="button">{text}</ButtonSt>}
            </div>
          </div>
        </main>
        <img className="journey" src={journey} alt="Journey of la Flaque" />
        <img className="stroke stroke1" src={stroke1} alt="Paint stroke" />
        <img className="stroke stroke2" src={stroke2} alt="Paint stroke" />
      </TestingSt>
    );
  }
}
