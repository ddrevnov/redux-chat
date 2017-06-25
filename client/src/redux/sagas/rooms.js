import { put, call, fork, takeEvery } from 'redux-saga/effects';

import * as api from '../../api/rooms';

import {
  FETCH_ROOMS,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_FAIL,
} from '../modules/rooms';

function* fetchRooms({ offset, limit }) {
  try {
    const { data } = yield call(api.fetchRooms, offset, limit);

    yield put({ type: FETCH_ROOMS_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: FETCH_ROOMS_FAIL, error });
  }
}

// Watchers

function* watchFetchRooms() {
  yield takeEvery(FETCH_ROOMS, fetchRooms);
}

export default [
  fork(watchFetchRooms),
]