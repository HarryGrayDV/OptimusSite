import { call, put, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { GET_BUTTON_DATA, SEND_BUTTON_DATA } from './constants';
import {
  getButtonDataSuccess,
  getButtonDataError,
  sendButtonDataSuccess,
  sendButtonDataError,
} from './actions';

export function* getButtonData() {
  const requestURL =
    'http://optimus-production.ef3fapxyeu.us-east-1.elasticbeanstalk.com/models/';

  try {
    const response = yield call(request, requestURL);
    yield put(getButtonDataSuccess(response));
  } catch (err) {
    yield put(getButtonDataError(err));
  }
}

export function* sendButtonData(buttonData) {
  const requestURL =
    'http://optimus-production.ef3fapxyeu.us-east-1.elasticbeanstalk.com/buttons/';
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(buttonData.data),
  };

  try {
    yield call(request, requestURL, options);
    yield put(sendButtonDataSuccess());
  } catch (err) {
    yield put(sendButtonDataError(err));
  }
}

export default function* testing() {
  yield takeLatest(GET_BUTTON_DATA, getButtonData);
  yield takeLatest(SEND_BUTTON_DATA, sendButtonData);
}
