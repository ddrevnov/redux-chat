import { put, call, fork, takeEvery } from 'redux-saga/effects';

import * as api from '../../api/auth';

import {
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAIL,
  LOGOUT,
} from '../modules/auth';

function* signUp(action) {
  try {
    const { token, _id } = yield call(api.signUp, action.payload);

    localStorage.setItem('token', token);
    localStorage.setItem('userId', _id);

    yield put({ type: SIGNUP_USER_SUCCESS });
  } catch (error) {
    yield put({ type: SIGNUP_USER_FAIL, error });
  }
}

function* signIn(action) {
  try {
    const { token, _id } = yield call(api.signIn, action.payload);

    localStorage.setItem('token', token);
    localStorage.setItem('userId', _id);

    yield put({ type: SIGNIN_USER_SUCCESS });
  } catch (error) {
    yield put({ type: SIGNIN_USER_FAIL, error });
  }
}

function onLogoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}

// Watchers

function* watchSignupUser() {
  yield takeEvery(SIGNUP_USER, signUp);
}

function* watchSigninUser() {
  yield takeEvery(SIGNIN_USER, signIn);
}

function* watchLogoutUser() {
  yield takeEvery(LOGOUT, onLogoutUser);
}

export default [
  fork(watchSignupUser),
  fork(watchSigninUser),
  fork(watchLogoutUser)
]