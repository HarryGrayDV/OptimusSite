/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Header from '../../components/Header';
import Slider from '../../components/Slider';
import PlayPause from '../../components/PlayPause';

import { HomeSt, ResultsSt, InsightsSt, ControlSt } from './style';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <>
        <Header />
        <HomeSt>
          <div>
            <ResultsSt>
              <InsightsSt>
                <h2>INSIGHTS</h2>
                <ul>
                  <li>
                    Using a red button could improve your click through rate by
                    25%
                  </li>
                  <li>
                    <hr />
                  </li>
                  <li>
                    Buttons with this width:height ratio outperform taller and
                    wider options
                  </li>
                  <li>
                    <hr />
                  </li>
                  <li>
                    Users in your target demographic much prefer buttons in this
                    position
                  </li>
                </ul>
              </InsightsSt>
            </ResultsSt>
            <Slider />
            <ControlSt>
              <PlayPause />
            </ControlSt>
          </div>
        </HomeSt>
      </>
    );
  }
}
