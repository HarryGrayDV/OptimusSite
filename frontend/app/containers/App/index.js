/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import TestingPage from 'containers/TestingPage/Loadable';

import { GlobalStyle } from '../../global-styles';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/testing" component={TestingPage} />
        <Route path="/" component={HomePage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
