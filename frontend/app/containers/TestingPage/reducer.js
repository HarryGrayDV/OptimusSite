import { fromJS } from 'immutable';

import {
  GET_BUTTON_DATA,
  GET_BUTTON_DATA_SUCCESS,
  GET_BUTTON_DATA_ERROR,
  SEND_BUTTON_DATA,
  SEND_BUTTON_DATA_SUCCESS,
  SEND_BUTTON_DATA_ERROR,
} from './constants';

export const initialState = fromJS({
  data: {},
});

function testingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BUTTON_DATA:
      return state.set('isLoading', true);
    case GET_BUTTON_DATA_SUCCESS:
      return state.set('buttonData', action.data).set('isLoading', false);
    case GET_BUTTON_DATA_ERROR:
      return state.set('isLoading', false).set('error', action.error);
    case SEND_BUTTON_DATA:
      return state.set('isLoading', true);
    case SEND_BUTTON_DATA_SUCCESS:
      return state.set('isLoading', false);
    case SEND_BUTTON_DATA_ERROR:
      return state.set('isLoading', false).set('error', action.error);
    default:
      return state;
  }
}

export default testingReducer;
