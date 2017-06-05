import auth from './auth';
import { all } from 'redux-saga/effects';

export default function* sagas() {
  yield all([
    ...auth
  ])
}
