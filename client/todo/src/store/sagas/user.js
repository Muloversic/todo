import { call, put, takeEvery, select, take } from 'redux-saga/effects'
import axios from 'axios'
import {
  CREATE_USER_SUCCESS,
  CREATE_USER_REQUEST,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
} from '../../constants'

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
})

instance.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
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
    console.log(response)
  } catch (e) {
    console.error('Error while registration', e)
  }
}

function* user() {
  yield takeEvery(CREATE_USER_REQUEST, createUser)
  yield takeEvery(LOGIN_USER_REQUEST, loginUser)
}

export default user
