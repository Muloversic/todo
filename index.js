const app = document.querySelector('#app');

const createTodoTemplate = () => {
  // _todo body
  const todoBody = document.createElement('div');
  todoBody.classList.add('todo');

  // _todo body-template-container
  const todoBodyTemplate = document.createElement('div');
  todoBodyTemplate.classList.add('todo__template');

  // _todo heading
  const todoHeading = document.createElement('h1');
  todoHeading.classList.add('todo__heading');
  todoHeading.textContent = 'todo list';

  // _todo form
  const form = document.createElement('form');
  form.classList.add('todo__form');

  // _todo-form-input
  const formInput = document.createElement('input');
  formInput.classList.add('todo__form-input');
  formInput.setAttribute('placeholder', 'Add new todo...');
  formInput.setAttribute('type', 'text');

  // _todo-form-button
  const formButton = document.createElement('button');
  formButton.classList.add('todo__form-button');
  formButton.textContent = 'submit';

  // append elements to form
  form.append(...[formInput, formButton]);

  // append elements to todo template and template to main container
  todoBodyTemplate.append(...[todoHeading, form]);
  todoBody.append(todoBodyTemplate);

  // call function for processing form
  processForm(formInput, formButton);

  return todoBody;
};

let activeTodos = 0;
let todosArray = [];
const processForm = (input, button) => {
  let todoName = '';
  input.addEventListener('change', (e) => (todoName = e.target.value));
  button.addEventListener('click', (e) => {
    e.preventDefault();
    // call createTodo function if input is not epmty string and reset 'todo name + input.value'
    if (todoName) {
      const todoObj = {};
      todoObj.name = todoName;
      todoObj.active = true;
      const todoId = Math.random().toString().slice(2) + todoName.slice(0, 5);
      todoObj.id = todoId;
      todosArray.push(todoObj);
      createTodoElement(todoId);
      input.classList.remove('todo__form-input--error');
    }

    if (!todoName) input.classList.add('todo__form-input--error');

    input.value = '';
    todoName = '';
  });
};

const createTodoInfoBar = () => {
  // _todo info bar
  const todoInfoBar = document.createElement('div');
  todoInfoBar.classList.add('todo__info-bar');

  // _todos counter at info bar
  const todoItemCounter = document.createElement('p');
  todoItemCounter.classList.add('todo__item-counter');
  todoItemCounter.textContent = 'Active todos: 1';

  // remove all todo btn
  const removeAllButton = document.createElement('button');
  removeAllButton.classList.add('todo__remove-all');
  removeAllButton.textContent = 'Remove all';
  removeAllButton.addEventListener('click', removeAllTodo);

  // append 'counter' and 'remove todo button' to info bar
  todoInfoBar.append(...[todoItemCounter, removeAllButton]);
  return todoInfoBar;
};

const createTodosContainer = () => {
  const todosContaienr = document.createElement('div');
  todosContaienr.classList.add('todo__items-container');
  return todosContaienr;
};

const todoBody = createTodoTemplate();
const todoContainer = createTodosContainer();
const todoInfoBar = createTodoInfoBar();

function removeAllTodo() {
  todosArray = [];
  changeTodoCounter(todosArray.length);
  todoContainer.innerHTML = '';
  todoBody.removeChild(todoContainer);
  todoBody.removeChild(todoInfoBar);
}

const changeTodoCounter = (num) => {
  const counterItem = document.querySelector('.todo__item-counter');
  if (counterItem) counterItem.textContent = `Active todos: ${num}`;
};

const countActiveTodos = (todosArr) => {
  const activeTodos = todosArr.filter((todo) => (todo.active ? todo : null));
  return activeTodos.length;
};

const createTodoElement = (currentTodoId) => {
  // prevent duplicate render
  const todosToRender = todosArray.filter((todo) => todo.id === currentTodoId);
  //render todos
  todosToRender.forEach((todo) => {
    const todoWrapper = document.createElement('div');
    todoWrapper.classList.add('todo__element-wrapper');
    todoWrapper.id = todo.id;

    // create input and its attrs
    const todoItem = document.createElement('input');
    todoItem.classList.add('todo__element');
    todoItem.value = todo.name;
    todoItem.name = todo.name;
    todoItem.disabled = true;

    // add toggle todo status listener for todo wrapper
    todoWrapper.addEventListener('click', (e) => toggleTodoStatus(e.target, todo.id, todoItem.disabled));

    // create edit button
    const editButton = document.createElement('span');
    editButton.classList.add(...['todo__edit', 'todo__action-element']);
    editButton.innerHTML = '&#9998;';
    let isEditing = false;

    // listener for edit button
    editButton.addEventListener('click', () => {
      // !isEditing means input is editable
      if (todoItem.value !== '') isEditing = !isEditing;
      editTodo(editButton, todoItem, isEditing, todo.id);

      // flip isEditing state if esc was pressed
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          isEditing = false;
        }
      });
    });

    // create delete button
    const deleteButton = document.createElement('span');
    deleteButton.classList.add(...['todo__delete', 'todo__action-element']);
    deleteButton.textContent = 'x';
    // listener for delete button
    deleteButton.addEventListener('click', () => deleteTodo(todo.id, todoWrapper));

    // append todo item+action button to wrapper, append wrappers to container
    todoWrapper.append(...[todoItem, editButton, deleteButton]);
    todoContainer.append(todoWrapper);
  });

  changeTodoCounter(countActiveTodos(todosArray));
  todoBody.append(...[todoInfoBar, todoContainer]);
};

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
  let initialTodoValue = todoItem.name;
  document.addEventListener('keydown', (e) => {
    // if escape was pressed set initial value to input.value and to arr with edited todo
    // works only if input value is not empty
    if (e.key === 'Escape' && todoItem.value !== '') {
      todoItem.disabled = true;
      button.innerHTML = '&#9998;';
      todoItem.value = initialTodoValue;
      todoItem.name = initialTodoValue;
      todoItem.classList.remove('todo__element--err');
    }
  });

  // make todo editable
  todoItem.disabled = false;
  button.innerHTML = '&#10004;';

  // check if it's editing state and value is not empty save edited todo and disable input
  if (!isEditing && todoItem.value !== '') {
    todoItem.disabled = true;
    button.innerHTML = '&#9998;';
    todoItem.classList.remove('todo__element--err');
    todoItem.name = todoItem.value;
    todosArray.forEach((todo) => {
      if (todo.id === todoId) {
        todo.name = todoItem.value;
      }
    });
  }

  // if input is empty make its border red
  if (todoItem.value === '') {
    todoItem.classList.add('todo__element--err');
  }
};

const deleteTodo = (todoId, todoElement) => {
  todosArray = todosArray.filter((todo) => todo.id !== todoId);
  const todoToRemove = document.getElementById(todoId);
  todoElement.remove(todoToRemove);
  changeTodoCounter(countActiveTodos(todosArray));

  // if array with todos is empty - delete container with them and info bar
  if (todosArray.length === 0) {
    todoContainer.innerHTML = '';
    todoBody.removeChild(todoContainer);
    todoBody.removeChild(todoInfoBar);
  }
};

app.append(todoBody);
