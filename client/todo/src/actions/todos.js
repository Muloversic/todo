import {
  LOAD_TODO_REQUEST,
  UPDATE_FILTER_REQUEST,
  ADD_TODO_REQUEST,
  DELETE_TODO_REQUEST,
  UPDATE_TODO_REQUEST,
  DELETE_ALL_TODOS_REQUEST,
} from '../constants'

export const loadTodosRequest = () => ({ type: LOAD_TODO_REQUEST })

export const addTodoRequest = (payload) => ({ type: ADD_TODO_REQUEST, payload })

export const deleteTodoRequest = (payload) => ({ type: DELETE_TODO_REQUEST, payload })

export const deleteAllTodosRequest = () => ({ type: DELETE_ALL_TODOS_REQUEST })

export const updateTodoRequest = (payload) => ({ type: UPDATE_TODO_REQUEST, payload })

export const updateFilterRequest = (payload) => ({ type: UPDATE_FILTER_REQUEST, payload })
