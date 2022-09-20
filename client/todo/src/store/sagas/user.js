import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import {
  CREATE_USER_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  CHECK_AUTH_REQUEST,
  CHECK_AUTH_SUCCESS,
  CLEAR_USER_STATE,
} from '../../constants'

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
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

    console.error('Error while login', err)
  }
}

function* logoutUser({ payload }) {
  yield localStorage.clear()
  yield payload('/')
  yield put({
    type: CLEAR_USER_STATE,
  })
}

function* checkUserAuth({ payload }) {
  try {
    const response = yield call(instance.get, 'refresh', {
      params: payload,
    })
    const { success, data } = response.data // refreshToken
    yield put({
      type: CHECK_AUTH_SUCCESS,
      payload: data,
    })
  } catch (err) {
    console.error('Error while checking auth', err)
  }
}

function* user() {
  yield takeEvery(CREATE_USER_REQUEST, createUser)
  yield takeEvery(LOGIN_USER_REQUEST, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
  yield takeEvery(CHECK_AUTH_REQUEST, checkUserAuth)
}

export default user
