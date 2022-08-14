import TodoTemplate from './app/components/TodoTemplate.js';
import Todos from './app/components/Todos.js';
import eventEmitter from './app/store/EventEmitter.js';
import Store from './app/store/Store.js';
import { ADD_TODO, STATE_UPDATED } from './app/constants.js';
const store = new Store();
const todoTemplate = new TodoTemplate();
const todos = new Todos();

eventEmitter.subscribe(ADD_TODO, (todo) => {
  store.addTodo(todo);
  store.countActiveTodos();
});

eventEmitter.subscribe(STATE_UPDATED, (state) => {
  todos.processTodos(state);
});

const app = document.querySelector('#app');
const todoBody = todoTemplate.getTodoBody();

app.append(todoBody);
