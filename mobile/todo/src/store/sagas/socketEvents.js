import { put, takeEvery, select } from '@redux-saga/core/effects'
import {
  ADD_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS,
  DELETE_ALL_TODOS_SUCCESS,
  NOTIFICATION_RECEIVED,
  NOTIFICATION_MAPPER,
} from '../../constants'

function* parseNotificationType({ payload }) {
  const filterType = yield select((state) => state.filter)
  const { type, data } = payload
  if (NOTIFICATION_MAPPER[type] && (type === 1 || type === 4)) {
    yield put({
      type: NOTIFICATION_MAPPER[type],
      payload: {
        todo: data,
        filterType,
      },
    })

    return
  }

  if (NOTIFICATION_MAPPER[type]) {
    yield put({ type: NOTIFICATION_MAPPER[type], payload: data })
  }
}

export default function* socketEvents() {
  yield takeEvery(NOTIFICATION_RECEIVED, parseNotificationType)
}
