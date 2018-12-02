import {
  GET_BUTTON_DATA,
  GET_BUTTON_DATA_SUCCESS,
  GET_BUTTON_DATA_ERROR,
  SEND_BUTTON_DATA,
  SEND_BUTTON_DATA_SUCCESS,
  SEND_BUTTON_DATA_ERROR,
} from './constants';

export function getButtonData(data) {
  return {
    type: GET_BUTTON_DATA,
    data,
  };
}

export function getButtonDataSuccess(data) {
  return {
    type: GET_BUTTON_DATA_SUCCESS,
    data,
  };
}

export function getButtonDataError(error) {
  return {
    type: GET_BUTTON_DATA_ERROR,
    error,
  };
}

export function sendButtonData(data) {
  return {
    type: SEND_BUTTON_DATA,
    data,
  };
}

export function sendButtonDataSuccess() {
  return {
    type: SEND_BUTTON_DATA_SUCCESS,
  };
}

export function sendButtonDataError(error) {
  return {
    type: SEND_BUTTON_DATA_ERROR,
    error,
  };
}
