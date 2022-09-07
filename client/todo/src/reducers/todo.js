import {
  LOAD_TODO_SUCCESS,
  ADD_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS,
  FILTER_UPDATED,
  DELETE_ALL_TODOS_SUCCESS,
} from '../constants'

const TODOS_STATE = {
  todos: [],
}

const TODOS_FILTER = 'all'

export const filter = (state = TODOS_FILTER, { type, payload }) => {
  switch (type) {
    case FILTER_UPDATED:
      return payload

    default:
      return state
  }
}

export const todo = (state = TODOS_STATE, action) => {
  switch (action.type) {
    case LOAD_TODO_SUCCESS:
      return {
        ...state,
        todos: action.payload,
      }

    case ADD_TODO_SUCCESS:
      if (action.payload.filterType !== 'done') {
        return {
          ...state,
          todos: [...state.todos, action.payload.todo],
        }
      }

      break

    case DELETE_TODO_SUCCESS:
      const withoutDeletedTodo = state.todos.filter((todo) => todo._id !== action.payload._id)
      return {
        ...state,
        todos: withoutDeletedTodo,
      }

    case DELETE_ALL_TODOS_SUCCESS:
      return {
        ...state,
        todos: [],
      }

    case UPDATE_TODO_SUCCESS:
      const { _id, name, active } = action.payload.todos
      const { filterType } = action.payload
      let updatedTodos = []
      const shouldTodoRemove =
        (filterType === 'active' && !active) || (filterType === 'done' && active)
      if (shouldTodoRemove) {
        updatedTodos = state.todos.filter((todo) => todo._id !== _id)
      } else {
        updatedTodos = state.todos.map((todo) => {
          if (todo._id === _id) {
            return {
              ...todo,
              active,
              name,
            }
          }

          return todo
        })
      }

      return {
        ...state,
        todos: updatedTodos,
      }

    default:
      return state
  }
}
