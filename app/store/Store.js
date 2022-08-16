import eventEmitter from '../store/EventEmitter.js';
import {
  ADD_TODO,
  STATE_UPDATED,
  DELETE_TODO,
  DELETE_ALL_TODOS,
  DELETE_INFO_BAR_ELEM,
  TOGGLE_TODO_STATUS,
  CHANGE_TODO,
} from '../constants.js';

class Store {
  constructor() {
    this.state = {
      todos: [],
      activeTodos: 0,
    };

    eventEmitter.subscribe(ADD_TODO, this.addTodo);
    eventEmitter.subscribe(DELETE_TODO, this.deleteTodo);
    eventEmitter.subscribe(DELETE_ALL_TODOS, this.removeAllTodo);
    eventEmitter.subscribe(TOGGLE_TODO_STATUS, this.toggleTodoStatus);
    eventEmitter.subscribe(CHANGE_TODO, this.changeTodo);
  }

  setState = (newState) => {
    this.state = { ...this.state, ...newState };
    eventEmitter.emit({ type: STATE_UPDATED });
  };

  addTodo = (newTodo) => {
    const todos = [...this.state.todos, newTodo];
    const newState = {
      ...this.state,
      activeTodos: this.countActiveTodos(todos),
      todos,
    };

    this.setState(newState);
  };

  toggleTodoStatus = ({ target }) => {
    const todoId = +target.parentElement.id;
    const todos = this.state.todos.map((todo) => {
      if (todo.id === todoId) {
        todo.active = !todo.active;
        target.classList.toggle('todo__element--done');
      }

      return todo;
    });

    const newState = {
      ...this.state,
      activeTodos: this.countActiveTodos(todos),
      todos,
    };

    this.setState(newState);
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
      activeTodos: this.countActiveTodos(todos),
      todos,
    };

    this.setState(newState);
  };

  deleteTodo = ({ target }) => {
    const todoId = +target.parentElement.id;
    const todos = this.state.todos.filter((todo) => todo.id !== todoId);
    const newState = {
      ...this.state,
      activeTodos: this.countActiveTodos(todos),
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
      activeTodos: this.countActiveTodos(todos),
      todos,
    };

    this.setState(newState);
  };

  countActiveTodos = (todos) => {
    const activeTodosArr = todos.filter((todo) => todo.active);
    const activeTodos = activeTodosArr.length;
    return activeTodos;
  };
}

const store = new Store();
export default store;
