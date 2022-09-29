import { spawn } from '@redux-saga/core/effects'
import todos from './sagas/todos'
import user from './sagas/user'
import socketEvents from './sagas/socketEvents'

export default function* rootSaga() {
  yield spawn(todos)
  yield spawn(user)
  yield spawn(socketEvents)
}
