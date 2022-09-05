import {
  LOAD_TODO_SUCCESS,
  ADD_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS,
  UPDATE_FILTER_SUCCESS,
} from '../constants';
const INITIAL_STATE = {
  todos: [],
  filterType: 'all',
};

const todo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_TODO_SUCCESS:
      return {
        ...state,
        todos: action.payload,
      };

    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.todos],
      };

    case DELETE_TODO_SUCCESS:
      const withoutDeletedTodo = state.todos.filter((todo) => todo._id !== action.todos._id);
      return {
        ...state,
        todos: withoutDeletedTodo,
      };

    case UPDATE_FILTER_SUCCESS:
      return {
        ...state,
        filterType: action.payload,
      };

    case UPDATE_TODO_SUCCESS:
      const { filterType } = state;
      const { _id, name, active } = action.todos;
      let updatedTodos = [];
      const shouldTodoRemove = (filterType === 'active' && !active) || (filterType === 'done' && active);
      if (shouldTodoRemove) {
        updatedTodos = state.todos.filter((todo) => todo._id !== _id);
      } else {
        updatedTodos = state.todos.map((todo) => {
          if (todo._id === _id) {
            return {
              ...todo,
              active,
              name,
            };
          }

          return todo;
        });
      }
      return {
        ...state,
        todos: updatedTodos,
      };

    default:
      return state;
  }
};

export default todo;
