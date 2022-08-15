import eventEmitter from '../store/EventEmitter.js';
import { DELETE_TODO, DELETE_ALL_TODOS } from '../constants.js';
import { createElement } from '../helpers.js';
class Todos {
  constructor() {
    this.todoContainer = this.createTodosContainer();
    this.todoInfoBar = this.createTodoInfoBarContainer();
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

    // add toggle todo status listener for todo wrapper
    todoWrapper.addEventListener('click', (e) => this.toggleTodoStatus(e.target, todo.id, todoItem.disabled));

    // create edit button
    const editButton = createElement('span', ['todo__edit', 'todo__action-element']);
    editButton.innerHTML = '&#9998;';
    let isEditing = false;

    // listener for edit button
    editButton.addEventListener('click', () => {
      // _!isEditing means input is editable
      if (todoItem.value !== '') {
        isEditing = !isEditing;
      }

      this.editTodo(editButton, todoItem, isEditing, todo.id);

      // flip isEditing state if esc was pressed
      todoItem.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
          isEditing = false;
        }
      });
    });

    // create delete button
    const deleteButton = createElement('span', ['todo__delete', 'todo__action-element'], 'x');

    // listener for delete button
    deleteButton.addEventListener('click', (event) => {
      eventEmitter.emit({ type: DELETE_TODO, payload: event });
    });

    // append todo item+action button to wrapper, append wrappers to container
    todoWrapper.append(...[todoItem, editButton, deleteButton]);
    this.todoContainer.append(todoWrapper);

    this.renderTodos();
  };

  toggleTodoStatus = (target, todoId, isDisabled) => {
    const isTodo = [...target.classList].includes('todo__element');
    if (isTodo && isDisabled) {
      this.todosArray.forEach((todo) => {
        if (todo.id === todoId) {
          todo.active = !todo.active;
          target.classList.toggle('todo__element--done');
        }
      });
    }

    //   renderTodos(todosArray);
    // this.changeTodoCounter(this.countActiveTodos(this.todosArray));
  };

  editTodo = (button, todoItem, isEditing, todoId) => {
    const confirmTodoChanges = () => {
      todoItem.disabled = true;
      button.innerHTML = '&#9998;';
      todoItem.classList.remove('todo__element--err');
      todoItem.name = todoItem.value;
      this.todosArray.forEach((todo) => {
        if (todo.id === todoId) {
          todo.name = todoItem.value;
        }
      });

      this.renderTodos(todosArray);
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
    if (!isEditing && todoItem.value !== '') {
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
