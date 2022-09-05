import { call, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_TODO_REQUEST,
  LOAD_TODO_SUCCESS,
  UPDATE_FILTER_REQUEST,
  UPDATE_FILTER_SUCCESS,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  DELETE_ALL_TODOS_REQUEST,
  DELETE_ALL_TODOS_SUCCESS,
} from '../constants';
import { loadTodosAPI, addTodoAPI, deleteTodoAPI, updateTodoAPI, deleteAllTodoAPI } from '../api/todos';

function* fetchTodos({ payload }) {
  try {
    const todos = yield call(loadTodosAPI, payload);
    yield put({ type: LOAD_TODO_SUCCESS, payload: todos });
    yield put({ type: UPDATE_FILTER_SUCCESS, payload });
  } catch (err) {
    console.log(err);
  }
}

function* createTodo({ payload }) {
  try {
    const todo = yield call(addTodoAPI, payload);
    yield put({ type: ADD_TODO_SUCCESS, payload: todo });
  } catch (err) {
    console.log(err);
  }
}

function* deleteTodo({ payload }) {
  try {
    const todo = yield call(deleteTodoAPI, payload);
    yield put({ type: DELETE_TODO_SUCCESS, payload: todo });
  } catch (err) {
    console.log(err);
  }
}

function* updateTodo({ payload }) {
  try {
    const todos = yield call(updateTodoAPI, payload);
    yield put({ type: UPDATE_TODO_SUCCESS, payload: todos });
  } catch (err) {
    console.log(err);
  }
}

function* deleteAllTodos() {
  try {
    const todos = yield call(deleteAllTodoAPI);
    yield put({ type: DELETE_ALL_TODOS_SUCCESS });
  } catch (err) {
    console.log(err);
  }
}

function* saga() {
  yield takeEvery(LOAD_TODO_REQUEST, fetchTodos);
  yield takeEvery(UPDATE_FILTER_REQUEST, fetchTodos);
  yield takeEvery(ADD_TODO_REQUEST, createTodo);
  yield takeEvery(DELETE_TODO_REQUEST, deleteTodo);
  yield takeEvery(UPDATE_TODO_REQUEST, updateTodo);
  yield takeEvery(DELETE_ALL_TODOS_REQUEST, deleteAllTodos);
}

export default saga;
