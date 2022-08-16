import TodoForm from './app/components/TodoForm.js';
import Todos from './app/components/Todos.js';
import App from './app/components/App.js';

const todoForm = new TodoForm();
const todos = new Todos();
const appMain = new App();

const app = document.querySelector('#app');
const todoBody = todoForm.getTodoBody();
app.append(todoBody);

window.addEventListener('load', appMain.render());
