import eventEmitter from '../store/EventEmitter.js';
import { createElement } from '../helpers.js';
import { ADD_TODO } from '../constants.js';
class TodoForm {
  createTodoForm = () => {
    // _todo body-template-container
    const todoBodyForm = createElement('div', 'todo__form-wrapper');

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
    todoBodyForm.append(...[todoHeading, form]);

    // call function for processing form
    this.processForm(formInput, formButton);

    return todoBodyForm;
  };

  processForm = (input, button) => {
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
        const todoId = Math.random();
        const todoObj = {
          name: todoName,
          active: true,
          id: todoId,
        };

        eventEmitter.emit({
          type: ADD_TODO,
          payload: todoObj,
        });
      }

      input.value = '';
      todoName = '';
    });
  };

  render = () => {
    // _todo body
    const todoBody = createElement('div', 'todo');
    todoBody.append(this.createTodoForm());
    return todoBody;
  };
}

export default TodoForm;
