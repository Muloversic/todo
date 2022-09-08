import { spawn } from 'redux-saga/effects'
import todos from './todos'

export default function* rootSaga() {
  yield spawn(todos)
}
