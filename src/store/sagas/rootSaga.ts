import { all, fork } from 'redux-saga/effects';
import { watchRegistration } from './registrationSaga';

export default function* rootSaga() {
  yield all([
    fork(watchRegistration),
    // Add other sagas here as needed
  ]);
}
