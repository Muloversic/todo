import { call, put, takeEvery, select } from 'redux-saga/effects'
import axios from 'axios'
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

const instance = axios.create({
  baseURL: 'http://localhost:8080/todos',
  timeout: 1000,
})

instance.interceptors.request.use((config) => {
  const userStore = JSON.parse(localStorage.getItem('userStore'))
  if (!userStore) {
    return config
  }

  config.headers.authorization = `Bearer ${userStore.token}`
  return config
})

instance.interceptors.response.use(
  (confing) => confing,
  async (error) => {
    const originalRequest = error.config
    const userStore = JSON.parse(localStorage.getItem('userStore'))
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      try {
        originalRequest._isRetry = true
        const response = await axios.get('http://localhost:8080/refresh', {
          params: userStore.refreshToken,
        })
        const { data } = response.data
        const { refreshToken, accessToken } = data
        localStorage.setItem(
          'userStore',
          JSON.stringify({
            refreshToken,
            token: accessToken,
            authenticated: true,
          }),
        )
        return instance.request(originalRequest)
      } catch (err) {
        console.log('No auth', err)
      }
    }

    throw error
  },
)

function* fetchTodos({ payload }) {
  try {
    let filter = {}
    if (payload === 'active') {
      filter = { active: true }
    }

    if (payload === 'done') {
      filter = { active: false }
    }

    const { success, data } = yield call(instance.get, '', {
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
    const response = yield call(instance.post, '', payload)
    const { success, data } = response.data
    yield put({
      type: ADD_TODO_SUCCESS,
      payload: {
        data,
        filterType,
      },
    })
  } catch (err) {
    console.log(err)
  }
}

function* deleteTodo({ payload }) {
  try {
    const response = yield call(instance.delete, `/${payload}`)
    const { success, data } = response.data
    yield put({ type: DELETE_TODO_SUCCESS, payload: data })
  } catch (err) {
    console.log(err)
  }
}

function* updateTodo({ payload }) {
  try {
    const filterType = yield select((state) => state.filter)
    const response = yield call(instance.patch, `/${payload._id}`, payload)
    const { success, data } = response.data
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

function* todos() {
  yield takeEvery([LOAD_TODO_REQUEST, UPDATE_FILTER], fetchTodos)
  yield takeEvery(ADD_TODO_REQUEST, createTodo)
  yield takeEvery(DELETE_TODO_REQUEST, deleteTodo)
  yield takeEvery(UPDATE_TODO_REQUEST, updateTodo)
  yield takeEvery(DELETE_ALL_TODOS_REQUEST, deleteAllTodos)
}

export default todos
