import { call, put, takeEvery } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import api from '../../api/api'
import socketClient from '../sockets/socketClient'
import {
  CREATE_USER_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  CLEAR_USER_STATE,
  SET_NAVIGATE,
  SET_USER,
} from '../../constants'

function* registerUser({ payload }) {
  try {
    const { success, data } = yield call(api, 'auth/registration', {
      method: 'POST',
      data: payload,
    })
    const { refreshToken, accessToken } = data
    socketClient.emit('auth', data._id)
    yield call(
      AsyncStorage.setItem,
      'userStore',
      JSON.stringify({
        refreshToken,
        token: accessToken,
        authenticated: true,
        username: data.nickname,
        userId: data._id,
      }),
    )
    // localStorage.setItem(
    //   'userStore',
    //   JSON.stringify({
    //     refreshToken,
    //     token: accessToken,
    //     authenticated: true,
    //     username: data.nickname,
    //     userId: data._id,
    //   }),
    // )

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
    const { success, data } = yield call(api, 'auth/login', {
      method: 'POST',
      data: payload,
    })

    const { refreshToken, accessToken } = data
    socketClient.emit('auth', data._id)
    yield call(
      AsyncStorage.setItem,
      'userStore',
      JSON.stringify({
        refreshToken,
        token: accessToken,
        authenticated: true,
        username: data.nickname,
        userId: data._id,
      }),
    )
    // localStorage.setItem(
    //   'userStore',
    //   JSON.stringify({
    //     refreshToken,
    //     token: accessToken,
    //     authenticated: true,
    //     username: data.nickname,
    //     userId: data._id,
    //   }),
    // )

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

function* logoutUser() {
  //   const userStore = JSON.parse(localStorage.getItem('userStore'))
  const userStore = JSON.parse(AsyncStorage.getItem('userStore'))
  socketClient.emit('logout', userStore.userId)
  yield AsyncStorage.clear()
  yield put({
    type: CLEAR_USER_STATE,
  })
}

function* checkUserAuth() {
  //   const userStore = JSON.parse(localStorage.getItem('userStore'))
  const userStore = JSON.parse(AsyncStorage.getItem('userStore'))
  if (userStore) {
    socketClient.emit('auth', userStore.userId)
    yield put({
      type: SET_USER,
      payload: userStore,
    })
  }
}

function* user() {
  //   yield takeEvery(CREATE_USER_REQUEST, registerUser)
  //   yield takeEvery(LOGIN_USER_REQUEST, loginUser)
  //   yield takeEvery(LOGOUT_USER, logoutUser)
  //   yield checkUserAuth()
}

export default user
