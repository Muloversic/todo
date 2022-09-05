import { call, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_TODO_REQUEST,
  LOAD_TODO_SUCCESS,
  UPDATE_FILTER_REQUEST,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
} from '../constants';
import { loadTodos, addTodo } from '../api/todos';

function* fetchTodos({ payload }) {
  try {
    const todos = yield call(loadTodos, payload);
    yield put({ type: LOAD_TODO_SUCCESS, todos });
  } catch (err) {
    console.log(err);
  }
}

function* createTodo({ payload }) {
  try {
    const todos = yield call(addTodo, payload);
    yield put({ type: ADD_TODO_SUCCESS, todos });
  } catch (err) {
    console.log(err);
  }
}

function* saga() {
  yield takeEvery(LOAD_TODO_REQUEST, fetchTodos);
  yield takeEvery(UPDATE_FILTER_REQUEST, fetchTodos);
  yield takeEvery(ADD_TODO_REQUEST, createTodo);
}

export default saga;
