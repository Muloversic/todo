import React, { Component } from 'react';
import Todo from './Todo.js';

class TodosContainer extends Component {
  constructor() {
    super();
    this.state = {
      editing: {
        targetId: '',
        inputValue: '',
      },
    };
  }

  handleKeyDown = () => {};

  editTodo = (e) => {
    const { editing } = this.state;
    const input = e.target;
    this.setState((prevState) => ({
      ...prevState,
      editing: { ...editing, inputValue: input.value.trim() },
    }));
  };

  handleTodoStatus = (todo) => {
    // eventEmitter.emit({
    //   type: UPDATE_TODO_REQUEST,
    //   payload: { _id: todo._id, active: !todo.active },
    // });
  };

  handleDeleteTodo = (todo) => {
    // eventEmitter.emit({ type: DELETE_TODO_REQUEST, payload: todo._id });
  };

  handeEditingMode = (e) => {
    const elementId = e.target.parentElement.id;
    const { editing } = this.state;
    const input = document.querySelector(`[data-input='${elementId}']`);
    const textLabel = document.querySelector(`[data-label='${elementId}']`);
    const edtiButton = e.target;
    input.value = input.name;
    input.classList.remove('todo__element--err');
    this.setState((prevState) => ({
      ...prevState,
      editing: { inputValue: input.name, targetId: elementId },
    }));

    const allInputs = document.querySelectorAll('.todo__element');
    const allTextLabels = document.querySelectorAll('.todo__element-text');
    if (elementId === editing.targetId || editing.targetId === '') {
      input.classList.toggle('todo__element--hidden');
      textLabel.classList.toggle('todo__element--hidden');
    }

    if (elementId !== editing.targetId && editing.targetId !== '') {
      [...allInputs].forEach((element) => element.classList.add('todo__element--hidden'));
      [...allTextLabels].forEach((element) => element.classList.remove('todo__element--hidden'));
      input.classList.remove('todo__element--hidden');
      textLabel.classList.add('todo__element--hidden');
    }

    if (editing.targetId === elementId) {
      this.setState((prevState) => ({
        ...prevState,
        editing: { ...editing, targetId: '' },
      }));
    }

    if (
      ![...input.classList].includes('todo__element--hidden') &&
      elementId !== editing.targetId &&
      editing.targetId !== ''
    ) {
      const allEditBtns = document.querySelectorAll('.todo__edit');
      [...allEditBtns].forEach((element) => {
        element.innerHTML = '&#9998;';
      });
    }

    if (![...input.classList].includes('todo__element--hidden')) {
      edtiButton.innerHTML = '&#10004;';
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          input.classList.add('todo__element--hidden');
          textLabel.classList.remove('todo__element--hidden');
          edtiButton.innerHTML = '&#9998;';
        }
      });

      if (editing.inputValue === '') {
        [...allInputs].forEach((element) => element.classList.add('todo__element--hidden'));
        [...allTextLabels].forEach((element) => element.classList.remove('todo__element--hidden'));
        input.classList.remove('todo__element--hidden');
        textLabel.classList.add('todo__element--hidden');
      }
    }

    if ([...input.classList].includes('todo__element--hidden')) {
      if (editing.inputValue.trim()) {
        edtiButton.innerHTML = '&#9998;';
        // eventEmitter.emit({
        //   type: UPDATE_TODO_REQUEST,
        //   payload: {
        //     _id: elementId,
        //     name: editing.inputValue,
        //   },
        // });
      } else {
        edtiButton.innerHTML = '&#10004;';
        input.value = '';
        input.classList.remove('todo__element--hidden');
        textLabel.classList.add('todo__element--hidden');
        input.classList.add('todo__element--err');
      }
    }
  };

  render() {
    const { todos } = this.props;
    const todoElements = todos.map((todo) => <Todo todo={todo} key={todo._id} />);
    return <div className="todo__items-container">{todoElements}</div>;
  }
}

export default TodosContainer;
