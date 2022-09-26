import { put, takeEvery, select } from 'redux-saga/effects'
import {
  LOAD_TODO_SUCCESS,
  ADD_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS,
  DELETE_ALL_TODOS_SUCCESS,
  NOTIFICATION_RECEIVED,
} from '../../constants'

function* parseNotificationType({ payload }) {
  const filterType = yield select((state) => state.filter)
  const { type, data } = payload
  switch (type) {
    case 0:
      yield put({ type: LOAD_TODO_SUCCESS, payload: data })
      break

    case 1:
      yield put({
        type: ADD_TODO_SUCCESS,
        payload: {
          todo: data,
          filterType,
        },
      })
      break

    case 2:
      yield put({ type: DELETE_TODO_SUCCESS, payload: data })
      break

    case 3:
      yield put({ type: DELETE_ALL_TODOS_SUCCESS })
      break

    case 4:
      yield put({
        type: UPDATE_TODO_SUCCESS,
        payload: {
          todos: data,
          filterType,
        },
      })
      break
    default:
      throw new Error('No data came')
  }
}

export default function* socketEvents() {
  yield takeEvery(NOTIFICATION_RECEIVED, parseNotificationType)
}
