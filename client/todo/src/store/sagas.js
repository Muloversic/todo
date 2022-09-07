import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'
import {
  LOAD_TODO_REQUEST,
  LOAD_TODO_SUCCESS,
  UPDATE_FILTER,
  FILTER_UPDATED,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  DELETE_ALL_TODOS_REQUEST,
  DELETE_ALL_TODOS_SUCCESS,
} from '../constants'

const instance = axios.create({
  baseURL: 'http://localhost:8080/todos',
  timeout: 1000,
})

function* fetchTodos({ payload }) {
  try {
    let filter = {}
    if (payload === 'active') {
      filter = { active: true }
    }

    if (payload === 'done') {
      filter = { active: false }
    }

    const getAllTodos = yield call(instance.get, '', {
      params: filter,
    })

    const { data } = getAllTodos.data.body
    yield put({ type: LOAD_TODO_SUCCESS, payload: data })
    yield put({ type: FILTER_UPDATED, payload: payload || 'all' })
  } catch (err) {
    console.log(err)
  }
}

function* createTodo({ payload }) {
  try {
    const filterType = yield select((state) => state.filter)
    const postTodo = yield call(instance.post, '', payload)
    const { data } = postTodo.data.body
    yield put({
      type: ADD_TODO_SUCCESS,
      payload: {
        todo: data,
        filterType,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

function* deleteTodo({ payload }) {
  try {
    const deletedTodo = yield call(instance.delete, `/${payload}`)
    const { data } = deletedTodo.data.body
    yield put({ type: DELETE_TODO_SUCCESS, payload: data })
  } catch (err) {
    console.log(err)
  }
}

function* updateTodo({ payload }) {
  try {
    const filterType = yield select((state) => state.filter)
    const updatedTodo = yield call(instance.patch, `/${payload._id}`, payload)
    const { data } = updatedTodo.data.body
    yield put({
      type: UPDATE_TODO_SUCCESS,
      payload: {
        todos: data,
        filterType,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

function* deleteAllTodos() {
  try {
    const deleteTodo = yield call(instance.delete, '')
    yield put({ type: DELETE_ALL_TODOS_SUCCESS })
  } catch (err) {
    console.log(err)
  }
}

function* saga() {
  yield takeEvery([LOAD_TODO_REQUEST, UPDATE_FILTER], fetchTodos)
  yield takeEvery(ADD_TODO_REQUEST, createTodo)
  yield takeEvery(DELETE_TODO_REQUEST, deleteTodo)
  yield takeEvery(UPDATE_TODO_REQUEST, updateTodo)
  yield takeEvery(DELETE_ALL_TODOS_REQUEST, deleteAllTodos)
}

export default saga
