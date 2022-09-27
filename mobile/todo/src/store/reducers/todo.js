import { handleAction, handleActions } from 'redux-actions'
import {
  LOAD_TODO_SUCCESS,
  ADD_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS,
  UPDATE_FILTER,
  DELETE_ALL_TODOS_SUCCESS,
} from '../../constants'

const TODOS_STATE = []
const TODOS_FILTER = 'all'

export const filter = handleAction(UPDATE_FILTER, (state, { payload }) => payload, TODOS_FILTER)

export const todo = handleActions(
  {
    [LOAD_TODO_SUCCESS]: (state, { payload }) => payload,
    [ADD_TODO_SUCCESS]: (state, { payload }) => {
      if (payload.filterType !== 'done') {
        return [...state, payload.todo]
      }

      return TODOS_STATE
    },
    [DELETE_TODO_SUCCESS]: (state, { payload }) =>
      state.filter((todo) => todo._id !== payload.todo._id),
    [DELETE_ALL_TODOS_SUCCESS]: () => [],
    [UPDATE_TODO_SUCCESS]: (state, { payload }) => {
      const { _id, name, active } = payload.todo
      const { filterType } = payload
      const shouldTodoRemove =
        (filterType === 'active' && !active) || (filterType === 'done' && active)
      if (shouldTodoRemove) {
        return state.filter((todo) => todo._id !== _id)
      }

      return state.map((todo) => {
        if (todo._id === _id) {
          return {
            ...todo,
            active,
            name,
          }
        }
        return todo
      })
    },
  },
  TODOS_STATE,
)
