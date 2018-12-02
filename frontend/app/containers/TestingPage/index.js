/*
 * TestingPage
 *
 * This page displays our example marketplace, with the latest ML model data
 */

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { getButtonData, sendButtonData } from './actions';
import { makeSelectButtonData } from './selectors';
import reducer from './reducer';
import saga from './saga';

import rating from '../../images/rating.svg';
import product from '../../images/product.png';
import journey from '../../images/journey.png';
import stroke1 from '../../images/stroke-1.png';
import stroke2 from '../../images/stroke-2.png';

import { TestingSt, MenuSt, LogoSt, ButtonSt } from './style';

class TestingPage extends React.PureComponent {
  componentDidMount() {
    const { onGetButtonData, embedded } = this.props;

    this.startTime = Date.now();

    // If we're standalone then we need to load the data
    if (!embedded) {
      onGetButtonData();
    }
  }

  /*
  * Tell the backend that we got a conversion
  */
  handleButtonClick = () => {
    const { onSendButtonData, buttonData } = this.props;
    // Calculate the time to achieve a click
    const ctd = Date.now() - this.startTime;
    // Dummy data for demographics
    const newButtonData = Object.assign({}, buttonData[0].combination, {
      age: 24,
      region: 1,
      mobile: false,
      ctd,
    });

    onSendButtonData(newButtonData);
  };

  render() {
    const { buttonData, embedded, embedButtonData } = this.props;
    const { text, position } = embedded
      ? embedButtonData
      : buttonData[buttonData.length - 1].combination;

    /*
    * TODO: improve HTML & CSS - built rapidly for POC!
    */
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
              {position === 2 && (
                <ButtonSt onClick={this.handleButtonClick} type="button">
                  {text}
                </ButtonSt>
              )}
              <img alt="La Flaque de Boue" src={product} />
              {position === 1 && (
                <ButtonSt onClick={this.handleButtonClick} type="button">
                  {text}
                </ButtonSt>
              )}
            </div>
            <div className="info">
              <span>La Flaque</span>
              <h1>de boue</h1>
              <div className="rating">
                <img src={rating} alt="Rating" />
              </div>
              {position === 3 && (
                <ButtonSt onClick={this.handleButtonClick} type="button">
                  {text}
                </ButtonSt>
              )}
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
              {position === 0 && (
                <ButtonSt onClick={this.handleButtonClick} type="button">
                  {text}
                </ButtonSt>
              )}
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

TestingPage.propTypes = {
  onGetButtonData: PropTypes.func.isRequired,
  onSendButtonData: PropTypes.func.isRequired,
  embedded: PropTypes.bool,
  embedButtonData: PropTypes.shape({
    text: PropTypes.string,
    position: PropTypes.number,
  }),
  buttonData: PropTypes.arrayOf(PropTypes.object),
};

TestingPage.defaultProps = {
  embedded: false,
  buttonData: [
    {
      combination: {
        text: 'BUY NOW',
        position: 0,
      },
    },
  ],
  embedButtonData: undefined,
};

export function mapDispatchToProps(dispatch) {
  return {
    onGetButtonData: () => dispatch(getButtonData()),
    onSendButtonData: data => dispatch(sendButtonData(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  buttonData: makeSelectButtonData(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'buttonData', reducer });
const withSaga = injectSaga({ key: 'buttonData', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TestingPage);
