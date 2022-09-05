import { LOAD_TODO_REQUEST, UPDATE_FILTER_REQUEST } from '../constants';
export const loadTodosRequest = () => {
  return {
    type: LOAD_TODO_REQUEST,
  };
};

export const updateFilterRequest = (payload) => {
  return { type: UPDATE_FILTER_REQUEST, payload };
};
