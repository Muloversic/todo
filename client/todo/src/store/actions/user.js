import { createAction } from 'redux-actions'
import {
  CREATE_USER_REQUEST,
  LOGIN_USER_REQUEST,
  LOGOUT_USER_REQUEST,
  CHECK_AUTH_REQUEST,
} from '../../constants'

export const createUserRequest = createAction(CREATE_USER_REQUEST)
export const loginUserRequest = createAction(LOGIN_USER_REQUEST)
export const logoutUserRequest = createAction(LOGOUT_USER_REQUEST)
export const checkAuthRequest = createAction(CHECK_AUTH_REQUEST)
