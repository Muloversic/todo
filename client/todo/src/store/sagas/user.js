import { call, put, takeEvery, select, take } from 'redux-saga/effects'
import axios from 'axios'
import {
  CREATE_USER_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  CHECK_AUTH_REQUEST,
  CHECK_AUTH_SUCCESS,
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
  try {
    const response = yield call(instance.post, 'logout', payload)
    const { success, data } = response.data // refreshToken
    yield put({
      type: LOGOUT_USER_SUCCESS,
      payload: data,
    })
  } catch (err) {
    console.error('Error while logout', err)
  }
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
  yield takeEvery(LOGOUT_USER_REQUEST, logoutUser)
  yield takeEvery(CHECK_AUTH_REQUEST, checkUserAuth)
}

export default user
