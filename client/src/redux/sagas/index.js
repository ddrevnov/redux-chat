import { all } from 'redux-saga/effects';

import auth from './auth';
import rooms from './rooms';

export default function* sagas() {
  yield all([
    ...auth,
    ...rooms
  ])
}
