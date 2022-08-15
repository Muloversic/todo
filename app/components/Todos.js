import eventEmitter from '../store/EventEmitter.js';
import { DELETE_TODO, DELETE_ALL_TODOS, TOGGLE_TODO_STATUS, CHANGE_TODO } from '../constants.js';
import { createElement } from '../helpers.js';
class Todos {
  constructor() {
    this.todoContainer = this.createTodosContainer();
    this.todoInfoBar = this.createTodoInfoBarContainer();
    this.isEditing = false;
  }

  createTodoInfoBarContainer = () => {
    // _todo info bar
    const todoInfoBar = createElement('div', 'todo__info-bar');
    return todoInfoBar;
  };

  createInfoBarElements = () => {
    // _todos counter at info bar
    const todoItemCounter = createElement('p', 'todo__item-counter', 'Active todos: 1');

    // remove all todo btn
    const removeAllButton = createElement('button', 'todo__remove-all', 'Remove all');
    removeAllButton.addEventListener('click', () => eventEmitter.emit({ type: DELETE_ALL_TODOS }));

    // append 'counter' and 'remove todo button' to info bar
    this.todoInfoBar.append(...[todoItemCounter, removeAllButton]);
  };

  deleteInfoBarElements = () => {
    const todoInfoBar = document.querySelector('.todo__info-bar');
    [...todoInfoBar.children].forEach((element) => element.remove());
  };

  createTodosContainer = () => {
    const todosContaienr = createElement('div', 'todo__items-container');
    return todosContaienr;
  };

  changeTodoCounter = (num) => {
    const counterItem = document.querySelector('.todo__item-counter');
    if (counterItem) {
      counterItem.textContent = `Active todos: ${num}`;
    }
  };

  createTodoElement = (todo) => {
    //render todo
    const todoWrapper = createElement('div', 'todo__element-wrapper', '', [{ id: todo.id }]);

    // create input and its attrs
    const todoItem = createElement('input', 'todo__element', '', [{ name: todo.name, disabled: true }]);
    todoItem.value = todo.name;
    if (!todo.active) {
      todoItem.classList.add('todo__element--done');
    }

    // create edit button
    const editButton = createElement('span', ['todo__edit', 'todo__action-element']);
    editButton.innerHTML = '&#9998;';
    // let isEditing = false;

    // create delete button
    const deleteButton = createElement('span', ['todo__delete', 'todo__action-element'], 'x');

    // add toggle todo status listener for todo wrapper
    todoWrapper.addEventListener('click', (event) => {
      if (event.target === todoItem && !this.isEditing) {
        eventEmitter.emit({ type: TOGGLE_TODO_STATUS, payload: event });
      }

      if (event.target === editButton) {
        // _!isEditing means input is editable
        if (todoItem.value !== '') {
          this.isEditing = !this.isEditing;
        }

        // flip isEditing state if esc was pressed
        todoItem.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' || e.key === 'Enter') {
            this.isEditing = false;
          }
        });

        this.editTodo(editButton, todoItem, todo.id);
      }

      if (event.target === deleteButton) {
        eventEmitter.emit({ type: DELETE_TODO, payload: event });
      }
    });

    // append todo item+action button to wrapper, append wrappers to container
    todoWrapper.append(...[todoItem, editButton, deleteButton]);
    this.todoContainer.append(todoWrapper);

    this.renderTodos();
  };

  editTodo = (button, todoItem, todoId) => {
    const confirmTodoChanges = () => {
      todoItem.disabled = true;
      button.innerHTML = '&#9998;';
      todoItem.classList.remove('todo__element--err');
      todoItem.name = todoItem.value;
      eventEmitter.emit({
        type: CHANGE_TODO,
        payload: {
          todoId,
          newTodoName: todoItem.value,
        },
      });
    };

    let initialTodoValue = todoItem.name;
    todoItem.addEventListener('keydown', (e) => {
      // if escape was pressed set initial value to input.value and to arr with edited todo
      // works only if input value is not empty
      if (e.key === 'Escape' && todoItem.value !== '') {
        todoItem.disabled = true;
        button.innerHTML = '&#9998;';
        todoItem.value = initialTodoValue;
        todoItem.name = initialTodoValue;
        todoItem.classList.remove('todo__element--err');
      }

      if (e.key === 'Enter' && todoItem.value !== '') {
        confirmTodoChanges();
      }
    });

    // make todo editable
    todoItem.disabled = false;
    button.innerHTML = '&#10004;';

    // check if it's editing state and value is not empty save edited todo and disable input
    if (!this.isEditing && todoItem.value !== '') {
      confirmTodoChanges();
    }

    // if input is empty make its border red
    if (todoItem.value === '') {
      todoItem.classList.add('todo__element--err');
    }
  };

  processTodos = (state) => {
    const { todos, activeTodos } = state;
    [...this.todoContainer.children].forEach((todo) => todo.remove());
    todos.forEach((todo) => this.createTodoElement(todo));
    this.changeTodoCounter(activeTodos);
  };

  renderTodos = () => {
    const todoBody = document.querySelector('.todo');
    if (!this.todoInfoBar.children.length) {
      this.createInfoBarElements();
    }

    if (todoBody.children.length <= 1) {
      todoBody.append(...[this.todoInfoBar, this.todoContainer]);
    }
  };
}

export default Todos;
