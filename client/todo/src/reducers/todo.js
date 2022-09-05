import { LOAD_TODO_SUCCESS, ADD_TODO_SUCCESS } from '../constants';
const INITIAL_STATE = {
  todos: [],
};

const todo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_TODO_SUCCESS:
      return {
        ...state,
        todos: action.todos,
      };

    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.todos],
      };

    default:
      return state;
  }
};

export default todo;
