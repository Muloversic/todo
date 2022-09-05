import { call, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_TODO_REQUEST,
  LOAD_TODO_SUCCESS,
  UPDATE_FILTER_REQUEST,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
} from '../constants';
import { loadTodosAPI, addTodoAPI, deleteTodoAPI } from '../api/todos';

function* fetchTodos({ payload }) {
  try {
    const todos = yield call(loadTodosAPI, payload);
    yield put({ type: LOAD_TODO_SUCCESS, todos });
  } catch (err) {
    console.log(err);
  }
}

function* createTodo({ payload }) {
  try {
    const todos = yield call(addTodoAPI, payload);
    yield put({ type: ADD_TODO_SUCCESS, todos });
  } catch (err) {
    console.log(err);
  }
}

function* deleteTodo({ payload }) {
  try {
    const todos = yield call(deleteTodoAPI, payload);
    yield put({ type: DELETE_TODO_SUCCESS, todos });
  } catch (err) {
    console.log(err);
  }
}

function* saga() {
  yield takeEvery(LOAD_TODO_REQUEST, fetchTodos);
  yield takeEvery(UPDATE_FILTER_REQUEST, fetchTodos);
  yield takeEvery(ADD_TODO_REQUEST, createTodo);
  yield takeEvery(DELETE_TODO_REQUEST, deleteTodo);
}

export default saga;
