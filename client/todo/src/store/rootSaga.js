import { spawn } from 'redux-saga/effects'
import todos from './sagas/todos'

export default function* rootSaga() {
  yield spawn(todos)
}
