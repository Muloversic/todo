import { handleActions } from 'redux-actions'
import {
  CREATE_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CREATE_USER_ERROR,
  CLEAR_USER_ERROR,
  CLEAR_USER_STATE,
  SET_USER,
} from '../../constants'

const USER_STATE = {
  indentity: {},
  authenticated: false,
}

const USER_ERROR = ''
export const userError = handleActions(
  {
    [LOGIN_USER_ERROR]: (state, { payload }) => payload,
    [CREATE_USER_ERROR]: (state, { payload }) => payload,
    [CLEAR_USER_ERROR]: (state, { payload }) => USER_ERROR,
  },
  USER_ERROR,
)

export const user = handleActions(
  {
    [CREATE_USER_SUCCESS]: (state, { payload }) => {
      const { nickname: username, _id } = payload
      return {
        indentity: {
          username,
          _id,
        },
        authenticated: true,
      }
    },
    [SET_USER]: (state, { payload }) => {
      const { nickname: username, _id } = payload
      return {
        indentity: {
          username,
          _id,
        },
        authenticated: true,
      }
    },
    [LOGIN_USER_SUCCESS]: (state, { payload }) => {
      const { nickname: username, _id } = payload
      return {
        indentity: {
          username,
          _id,
        },
        authenticated: true,
        errorMessage: '',
      }
    },
    [CLEAR_USER_STATE]: () => USER_STATE,
  },
  USER_STATE,
)
