import { spawn } from 'redux-saga/effects'
import todos from './sagas/todos'
import user from './sagas/user'

export default function* rootSaga() {
  yield spawn(todos)
  yield spawn(user)
}
