import eventEmitter from '../store/EventEmitter.js';
import { STATE_UPDATED, DELETE_INFO_BAR_ELEM } from '../constants.js';
class Store {
  constructor() {
    this.state = {
      todos: [],
      activeTodos: 0,
    };
  }

  setState = (newState) => {
    this.state = { ...this.state, ...newState };
    eventEmitter.emit({ type: STATE_UPDATED, payload: this.state });
  };

  addTodo = (newTodo) => {
    const todos = [...this.state.todos, newTodo];
    const newState = {
      ...this.state,
      todos,
    };

    this.setState(newState);
  };

  toggleTodoStatus = ({ target }) => {
    const isDisabled = target.disabled;
    const todoId = +target.parentElement.id;

    if (isDisabled) {
      const todos = this.state.todos.map((todo) => {
        if (todo.id === todoId) {
          todo.active = !todo.active;
          target.classList.toggle('todo__element--done');
        }

        return todo;
      });

      const newState = {
        ...this.state,
        todos,
      };

      this.setState(newState);
    }
  };

  changeTodo = ({ todoId, newTodoName }) => {
    const todos = this.state.todos.map((todo) => {
      if (todo.id === todoId) {
        todo.name = newTodoName;
      }

      return todo;
    });

    const newState = {
      ...this.state,
      todos,
    };

    this.setState(newState);
  };

  deleteTodo = ({ target }) => {
    const todoId = +target.parentElement.id;
    const todos = this.state.todos.filter((todo) => todo.id !== todoId);
    const newState = {
      ...this.state,
      todos,
    };

    this.setState(newState);

    if (!this.state.todos.length) {
      eventEmitter.emit({ type: DELETE_INFO_BAR_ELEM });
    }
  };

  removeAllTodo = () => {
    const todos = [];
    const newState = {
      ...this.state,
      todos,
    };

    this.setState(newState);
  };

  countActiveTodos = () => {
    const activeTodosArr = this.state.todos.filter((todo) => todo.active);
    const activeTodos = activeTodosArr.length;
    const newState = {
      ...this.state,
      activeTodos,
    };

    this.setState(newState);
  };
}

export default Store;
