import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTesting = state => state.get('buttonData', initialState);

const makeSelectButtonData = () =>
  createSelector(selectTesting, testingState => testingState.get('buttonData'));

const makeSelectCurrentButtonData = () =>
  createSelector(
    selectTesting,
    testingState => testingState.get('buttonData')[0].combination,
  );

export { selectTesting, makeSelectButtonData, makeSelectCurrentButtonData };
