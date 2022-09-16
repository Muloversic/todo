import { call, put, takeEvery, select, take } from 'redux-saga/effects'
import axios from 'axios'
import {
  CREATE_USER_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CHECK_AUTH_REQUEST,
} from '../../constants'

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
})

const instance2 = axios.create({
  baseURL: 'http://localhost:8080',
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

function* createUser({ payload }) {
  try {
    const response = yield call(instance.post, 'registration', payload)
    const { success, data } = response.data
    yield put({
      type: CREATE_USER_SUCCESS,
      payload: data,
    })
  } catch (err) {
    const { data } = err.response.data
    yield put({
      type: CREATE_USER_ERROR,
      payload: data,
    })
    console.error('Error while registration', err)
  }
}

function* loginUser({ payload }) {
  try {
    const response = yield call(instance.post, 'login', payload)
    const { success, data } = response.data
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: data,
    })
  } catch (err) {
    const { data } = err.response.data
    yield put({
      type: LOGIN_USER_ERROR,
      payload: data,
    })

    console.error('Error while registration', err)
  }
}

function* checkAuth({ payload }) {
  try {
    const response = yield call(axios.get, 'http://localhost:8080/refresh', {
      params: payload,
    })
    const { success, data } = response.data
    console.log(data)
    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: data,
    })
  } catch (err) {
    console.log(err)
  }
}

function* user() {
  yield takeEvery(CREATE_USER_REQUEST, createUser)
  yield takeEvery(LOGIN_USER_REQUEST, loginUser)
  yield takeEvery(CHECK_AUTH_REQUEST, checkAuth)
}

export default user
