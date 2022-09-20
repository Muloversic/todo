import { call, put, takeEvery } from 'redux-saga/effects'
import instance from '../../api/api'
import {
  CREATE_USER_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  SET_USER,
  CLEAR_USER_STATE,
} from '../../constants'

function* registerUser({ payload }) {
  try {
    const response = yield call(instance.post, 'auth/registration', payload)
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
    const response = yield call(instance.post, 'auth/login', payload)
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

function* checkUserAuth() {
  const userStore = JSON.parse(localStorage.getItem('userStore'))
  if (userStore) {
    yield put({
      type: SET_USER,
      payload: userStore,
    })
  }
}

function* user() {
  yield takeEvery(CREATE_USER_REQUEST, registerUser)
  yield takeEvery(LOGIN_USER_REQUEST, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
  //   yield takeEvery(CHECK_AUTH_REQUEST, checkUserAuth)

  yield checkUserAuth()
}

export default user
