/**
 *
 * Result
 *
 * Wrapper component for displaying the live test site with a given historical model
 * TODO: display the TestingPage a bit less unusually
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TestingPage from '../../containers/TestingPage';
import { colors, media } from '../../global-styles';

const ResultSt = styled.div`
  position: relative;
  width: 900px;
  height: 600px;
  background: #ffffff;
  box-shadow: 0 22px 64px 0 rgba(0, 0, 0, 0.15);
  z-index: 2;
  overflow: hidden;
  pointer-events: none;

  ${media.projector`
    width: 700px;
    height: 480px;
  `};

  > div {
    width: 1440px;
    height: 1200px;
    position: absolute;
    top: 20px;
    left: 32px;
    overflow: hidden;

    ${media.projector`
      top: 36px;
      left: 28px;
    `};
  }

  > div > * {
    transform-origin: left top;
    transform: scale(0.58);
    border: 4px solid ${colors.tertiary};

    ${media.projector`
      transform: scale(0.45);
    `};
  }
`;

const Result = ({ currentButtonData }) => (
  <ResultSt>
    <div>
      <TestingPage embedded embedButtonData={currentButtonData} />
    </div>
  </ResultSt>
);

Result.propTypes = {
  currentButtonData: PropTypes.shape({
    text: PropTypes.string,
    position: PropTypes.number,
    created_at: PropTypes.string,
  }).isRequired,
};

export default Result;
