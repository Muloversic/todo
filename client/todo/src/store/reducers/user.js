import { handleActions } from 'redux-actions'
import {
  CREATE_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CREATE_USER_ERROR,
} from '../../constants'

const USER_STATE = {
  indentity: {},
  authenticated: false,
  errorMessage: '',
}

export const user = handleActions(
  {
    [LOGIN_USER_SUCCESS]: (state, { payload }) => {
      const { nickname: username, _id, refreshToken, accessToken } = payload
      localStorage.setItem(
        'userStore',
        JSON.stringify({
          refreshToken,
          token: accessToken,
          authenticated: true,
        }),
      )
      return {
        ...state,
        authenticated: true,
        indentity: {
          username,
          _id,
        },
      }
    },
    [LOGIN_USER_ERROR]: (state, { payload }) => ({ errorMessage: payload }),
  },
  USER_STATE,
)
