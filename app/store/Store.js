import eventEmitter from '../store/EventEmitter.js';
import { STATE_UPDATED } from '../constants.js';
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
