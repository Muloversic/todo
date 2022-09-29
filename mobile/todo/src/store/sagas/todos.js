import { call, put, takeEvery, select } from '@redux-saga/core/effects'
import api from '../../api/api'
import {
  LOAD_TODO_REQUEST,
  LOAD_TODO_SUCCESS,
  UPDATE_FILTER,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  DELETE_ALL_TODOS_REQUEST,
  DELETE_ALL_TODOS_SUCCESS,
} from '../../constants'

function* fetchTodos({ payload }) {
  try {
    let filter = {}
    if (payload === 'active') {
      filter = { active: true }
    }

    if (payload === 'done') {
      filter = { active: false }
    }

    const { success, data } = yield call(api, 'todos', {
      params: filter,
    })

    yield put({ type: LOAD_TODO_SUCCESS, payload: data })
  } catch (err) {
    console.log(err)
  }
}

function* createTodo({ payload }) {
  try {
    const filterType = yield select((state) => state.filter)
    const { success, data } = yield call(api, 'todos', {
      method: 'POST',
      data: payload,
    })

    // yield put({
    //   type: ADD_TODO_SUCCESS,
    //   payload: {
    //     todo: data,
    //     filterType,
    //   },
    // })
  } catch (err) {
    console.log(err)
  }
}

function* deleteTodo({ payload }) {
  try {
    const { success, data } = yield call(api, `todos/${payload}`, {
      method: 'DELETE',
    })

    // yield put({ type: DELETE_TODO_SUCCESS, payload: data })
  } catch (err) {
    console.log(err)
  }
}

function* updateTodo({ payload }) {
  try {
    const filterType = yield select((state) => state.filter)
    const { success, data } = yield call(api, `todos/${payload._id}`, {
      method: 'PATCH',
      data: payload,
    })

    // yield put({
    //   type: UPDATE_TODO_SUCCESS,
    //   payload: {
    //     todos: data,
    //     filterType,
    //   },
    // })
  } catch (err) {
    console.log(err)
  }
}

function* deleteAllTodos() {
  try {
    const deleteTodo = yield call(api, 'todos', {
      method: 'DELETE',
    })

    // yield put({ type: DELETE_ALL_TODOS_SUCCESS })
  } catch (err) {
    console.log(err)
  }
}

function* todos() {
  yield takeEvery([LOAD_TODO_REQUEST, UPDATE_FILTER], fetchTodos)
  yield takeEvery(ADD_TODO_REQUEST, createTodo)
  yield takeEvery(DELETE_TODO_REQUEST, deleteTodo)
  yield takeEvery(UPDATE_TODO_REQUEST, updateTodo)
  yield takeEvery(DELETE_ALL_TODOS_REQUEST, deleteAllTodos)
}

export default todos
