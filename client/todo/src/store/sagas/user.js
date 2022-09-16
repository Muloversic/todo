import { call, put, takeEvery, select, take } from 'redux-saga/effects'
import axios from 'axios'
import {
  CREATE_USER_SUCCESS,
  CREATE_USER_REQUEST,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from '../../constants'

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
})

instance.interceptors.request.use((config) => {
  const userStore = localStorage.getItem('userStore')
  if (!userStore) {
    return config
  }

  config.headers.authorization = `Bearer ${userStore.token}`
  return config
})

function* createUser({ payload }) {
  try {
    const response = yield call(instance.post, 'registration', payload)
    console.log(response)
  } catch (e) {
    console.error('Error while registration', e)
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

function* user() {
  yield takeEvery(CREATE_USER_REQUEST, createUser)
  yield takeEvery(LOGIN_USER_REQUEST, loginUser)
}

export default user
