const app = document.querySelector('#app');

const createElement = (elName, elClass, elContent, attrArr) => {
  const element = document.createElement(elName);
  if (elClass) {
    if (Array.isArray(elClass)) {
      element.classList.add(...elClass);
    } else {
      element.classList.add(elClass);
    }
  }

  if (elContent) {
    element.textContent = elContent;
  }

  if (attrArr) {
    attrArr.forEach((attrObj) => {
      for (let attrName in attrObj) {
        element.setAttribute(attrName, attrObj[attrName]);
      }
    });
  }

  return element;
};

const createTodoTemplate = () => {
  // _todo body
  const todoBody = createElement('div', 'todo');

  // _todo body-template-container
  const todoBodyTemplate = createElement('div', 'todo__template');

  // _todo heading
  const todoHeading = createElement('h1', 'todo__heading', 'todo list');

  // _todo form
  const form = createElement('form', 'todo__form');

  // _todo-form-input
  const formInput = createElement('input', 'todo__form-input', '', [{ placeholder: 'Add new todo...' }, { type: 'text' }]);

  // _todo-form-button
  const formButton = createElement('button', 'todo__form-button', 'submit');

  // append elements to form
  form.append(...[formInput, formButton]);

  // append elements to todo template and template to main container
  todoBodyTemplate.append(...[todoHeading, form]);
  todoBody.append(todoBodyTemplate);

  // call function for processing form
  processForm(formInput, formButton);

  return todoBody;
};

let todosArray = [];
const processForm = (input, button) => {
  let todoName = '';
  input.addEventListener('change', (e) => {
    input.classList.remove('todo__form-input--error');
    todoName = e.target.value.trim();
  });

  button.addEventListener('click', (e) => {
    e.preventDefault();
    if (!todoName) {
      input.classList.add('todo__form-input--error');
    }

    if (todoName) {
      input.classList.remove('todo__form-input--error');
      const todoId = todosArray.length + 1;
      const todoObj = {
        name: todoName,
        active: true,
        id: todoId,
      };

      if (!todoInfoBar.children.length) {
        createInfoBarElements();
      }

      todosArray.push(todoObj);
      renderTodos(todosArray);
    }

    input.value = '';
    todoName = '';
  });
};

const createTodoInfoBarContainer = () => {
  // _todo info bar
  const todoInfoBar = createElement('div', 'todo__info-bar');
  return todoInfoBar;
};

const createInfoBarElements = () => {
  // _todos counter at info bar
  const todoItemCounter = createElement('p', 'todo__item-counter', 'Active todos: 1');

  // remove all todo btn
  const removeAllButton = createElement('button', 'todo__remove-all', 'Remove all');
  removeAllButton.addEventListener('click', removeAllTodo);

  // append 'counter' and 'remove todo button' to info bar
  todoInfoBar.append(...[todoItemCounter, removeAllButton]);
};

const createTodosContainer = () => {
  const todosContaienr = createElement('div', 'todo__items-container');
  return todosContaienr;
};

const todoBody = createTodoTemplate();
const todoContainer = createTodosContainer();
const todoInfoBar = createTodoInfoBarContainer();

function removeAllTodo() {
  todosArray = [];
  [...todoInfoBar.children].forEach((element) => element.remove());
  renderTodos(todosArray);
}

const changeTodoCounter = (num) => {
  const counterItem = document.querySelector('.todo__item-counter');
  if (counterItem) {
    counterItem.textContent = `Active todos: ${num}`;
  }
};

const countActiveTodos = (todosArr) => {
  const activeTodos = todosArr.filter((todo) => todo.active);
  return activeTodos.length;
};

const renderTodos = (todos) => {
  [...todoContainer.children].forEach((todo) => todo.remove());
  todos.forEach((todo) => createTodoElement(todo));
};

const createTodoElement = (todo) => {
  //render todo
  const todoWrapper = createElement('div', 'todo__element-wrapper', '', [{ id: todo.id }]);

  // create input and its attrs
  const todoItem = createElement('input', 'todo__element', '', [{ name: todo.name, disabled: true }]);
  todoItem.value = todo.name;
  if (!todo.active) {
    todoItem.classList.add('todo__element--done');
  }

  // add toggle todo status listener for todo wrapper
  todoWrapper.addEventListener('click', (e) => toggleTodoStatus(e.target, todo.id, todoItem.disabled));

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

    editTodo(editButton, todoItem, isEditing, todo.id);

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
  deleteButton.addEventListener('click', () => deleteTodo(todo.id));

  // append todo item+action button to wrapper, append wrappers to container
  todoWrapper.append(...[todoItem, editButton, deleteButton]);
  todoContainer.append(todoWrapper);

  changeTodoCounter(countActiveTodos(todosArray));
};

todoBody.append(...[todoInfoBar, todoContainer]);

const toggleTodoStatus = (target, todoId, isDisabled) => {
  const isTodo = [...target.classList].includes('todo__element');
  if (isTodo && isDisabled) {
    todosArray.forEach((todo) => {
      if (todo.id === todoId) {
        todo.active = !todo.active;
        target.classList.toggle('todo__element--done');
      }
    });
  }

  changeTodoCounter(countActiveTodos(todosArray));
};

const editTodo = (button, todoItem, isEditing, todoId) => {
  const confirmTodoChanges = () => {
    todoItem.disabled = true;
    button.innerHTML = '&#9998;';
    todoItem.classList.remove('todo__element--err');
    todoItem.name = todoItem.value;
    todosArray.forEach((todo) => {
      if (todo.id === todoId) {
        todo.name = todoItem.value;
      }
    });

    renderTodos(todosArray);
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

  console.log(todosArray);
};

const deleteTodo = (todoId) => {
  todosArray = todosArray.filter((todo) => todo.id !== todoId);
  renderTodos(todosArray);
  changeTodoCounter(countActiveTodos(todosArray));

  // if array with todos is empty - delete container with them and info bar
  if (todosArray.length === 0) {
    removeAllTodo();
  }
};

app.append(todoBody);
