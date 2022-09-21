import { call, put, takeEvery } from 'redux-saga/effects'
import instance from '../../api/axiosInstance'
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
    const { success, data } = yield call(instance.post, 'auth/registration', payload)
    const { refreshToken, accessToken } = data
    localStorage.setItem(
      'userStore',
      JSON.stringify({
        refreshToken,
        token: accessToken,
        authenticated: true,
        username: data.nickname,
        userId: data._id,
      }),
    )

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
    const { success, data } = yield call(instance.post, 'auth/login', payload)
    const { refreshToken, accessToken } = data
    localStorage.setItem(
      'userStore',
      JSON.stringify({
        refreshToken,
        token: accessToken,
        authenticated: true,
        username: data.nickname,
        userId: data._id,
      }),
    )

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

function setNavigate({ payload }) {
  instance.navigate = payload
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
  yield takeEvery(SET_NAVIGATE, setNavigate)

  yield checkUserAuth()
}

export default user
