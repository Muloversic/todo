import { createAction } from 'redux-actions'
import {
  CREATE_USER_REQUEST,
  LOGIN_USER_REQUEST,
  LOGOUT_USER,
  CLEAR_USER_ERROR,
} from '../../constants'

export const createUserRequest = createAction(CREATE_USER_REQUEST)
export const loginUserRequest = createAction(LOGIN_USER_REQUEST)
export const logoutUserRequest = createAction(LOGOUT_USER)
export const clearUserError = createAction(CLEAR_USER_ERROR)
