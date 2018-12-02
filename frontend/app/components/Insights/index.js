/**
 *
 * Insights
 *
 * Side panel displaying the benefits OptimusSite has provided so far
 * TODO: get dynamic insights from BE / genericise component
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, media } from '../../global-styles';

const InsightsSt = styled.div`
  position: absolute;
  top: 24px;
  left: 100%;
  width: 300px;
  height: calc(100% - 48px);
  display: flex;
  flex-direction: column;
  background-color: ${colors.tertiary};
  box-shadow: 0 22px 64px 0 rgba(0, 0, 0, 0.15);
  color: #fff;
  padding: 24px;
  transform: ${props =>
    props.playing ? 'translateX(-320px)' : 'translateX(0)'};
  transition: transform 0.75s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: 1;

  ${media.projector`
    width: 220px;
  transform: ${props =>
    props.playing ? 'translateX(-220px)' : 'translateX(0)'};
  `};

  h2 {
    margin-top: 0;
  }

  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    list-style-type: none;
    padding: 0;
    margin: 0;

    hr {
      opacity: 0.2;
    }
  }
`;

const Insights = ({ playing, modelCount }) => (
  <InsightsSt playing={playing}>
    <h2>INSIGHTS</h2>
    <ul>
      <li>
        OptimusSite has assisted in improving the conversion rate of your CTA by
        8%
      </li>
      <li>
        <hr />
      </li>
      <li>
        We have incrementally improved your website {modelCount} times since you
        started
      </li>
      <li>
        <hr />
      </li>
      <li>
        Users on your target device (desktop) responded best to buttons in this
        position
      </li>
    </ul>
  </InsightsSt>
);

Insights.propTypes = {
  playing: PropTypes.bool.isRequired,
  modelCount: PropTypes.number.isRequired,
};

export default Insights;
