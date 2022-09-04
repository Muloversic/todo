import { LOAD_TODO_REQUEST } from '../constants';
export const loadTodosRequest = () => {
  return {
    type: LOAD_TODO_REQUEST,
  };
};

export const loadTodosSuccess = (payload) => {
  return {
    type: LOAD_TODO_REQUEST,
    payload,
  };
};
