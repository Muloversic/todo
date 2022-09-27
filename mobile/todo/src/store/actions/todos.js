import { createAction } from 'redux-actions'
import {
  LOAD_TODO_REQUEST,
  UPDATE_FILTER,
  ADD_TODO_REQUEST,
  DELETE_TODO_REQUEST,
  UPDATE_TODO_REQUEST,
  DELETE_ALL_TODOS_REQUEST,
} from '../../constants'

export const loadTodosRequest = createAction(LOAD_TODO_REQUEST)

export const addTodoRequest = createAction(ADD_TODO_REQUEST)

export const deleteTodoRequest = createAction(DELETE_TODO_REQUEST)

export const deleteAllTodosRequest = createAction(DELETE_ALL_TODOS_REQUEST)

export const updateTodoRequest = createAction(UPDATE_TODO_REQUEST)

export const updateFilterRequest = createAction(UPDATE_FILTER)
