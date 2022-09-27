import { createAction } from 'redux-actions'
import {
  CREATE_USER_REQUEST,
  LOGIN_USER_REQUEST,
  LOGOUT_USER,
  CLEAR_USER_ERROR,
  SET_NAVIGATE,
} from '../../constants'

export const createUserRequest = createAction(CREATE_USER_REQUEST)
export const loginUserRequest = createAction(LOGIN_USER_REQUEST)
export const logoutUserRequest = createAction(LOGOUT_USER)
export const clearUserError = createAction(CLEAR_USER_ERROR)
export const setNavigate = createAction(SET_NAVIGATE)
