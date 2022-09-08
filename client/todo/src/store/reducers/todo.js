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

export const filter = (state = TODOS_FILTER, { type, payload }) => {
  switch (type) {
    case UPDATE_FILTER:
      return payload

    default:
      return state
  }
}

export const todo = (state = TODOS_STATE, { type, payload }) => {
  switch (type) {
    case LOAD_TODO_SUCCESS:
      return payload.data

    case ADD_TODO_SUCCESS:
      if (payload.filterType !== 'done') {
        return [...state, payload.data]
      }

      break

    case DELETE_TODO_SUCCESS:
      return state.filter((todo) => todo._id !== payload._id)

    case DELETE_ALL_TODOS_SUCCESS:
      return []

    case UPDATE_TODO_SUCCESS:
      const { _id, name, active } = payload.todos
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

    default:
      return state
  }
}
