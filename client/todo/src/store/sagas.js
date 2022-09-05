import { call, put, takeEvery } from 'redux-saga/effects';
import { LOAD_TODO_REQUEST, LOAD_TODO_SUCCESS, UPDATE_FILTER_REQUEST } from '../constants';
import { loadTodos } from '../api/todos';

function* fetchTodos({ payload }) {
  try {
    const todos = yield call(loadTodos, payload);
    yield put({ type: LOAD_TODO_SUCCESS, todos });
  } catch (err) {
    console.log(err);
  }
}

function* saga() {
  yield takeEvery(LOAD_TODO_REQUEST, fetchTodos);
  yield takeEvery(UPDATE_FILTER_REQUEST, fetchTodos);
}

export default saga;
