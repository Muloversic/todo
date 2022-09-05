import { LOAD_TODO_REQUEST, UPDATE_FILTER_REQUEST, ADD_TODO_REQUEST } from '../constants';
export const loadTodosRequest = () => ({ type: LOAD_TODO_REQUEST });

export const addTodoRequest = (payload) => ({
  type: ADD_TODO_REQUEST,
  payload,
});

export const updateFilterRequest = (payload) => ({ type: UPDATE_FILTER_REQUEST, payload });
