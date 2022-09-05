import React, { Component } from 'react';
import { ADD_TODO_REQUEST } from '../constants.js';

class TodoForm extends Component {
  constructor() {
    super();
    this.state = {
      todoName: '',
    };
  }

  handleInput = (e) => {
    const input = e.target;
    input.classList.remove('todo__form-input--error');
    this.setState({ todoName: input.value.trim() });
  };

  handleButton = (e) => {
    e.preventDefault();
    const { todoName } = this.state;
    const input = document.querySelector('.todo__form-input');

    if (!todoName) {
      input.classList.add('todo__form-input--error');
    }

    if (todoName) {
      input.classList.remove('todo__form-input--error');
      const todoObj = {
        name: todoName,
        active: true,
      };

      //   eventEmitter.emit({
      //     type: ADD_TODO_REQUEST,
      //     payload: todoObj,
      //   });
    }

    this.setState({ todoName: '' });
    input.value = '';
  };

  render() {
    return (
      <>
        <div className="todo__form-wrapper">
          <h1 className="todo__heading">todo list</h1>
          <form className="todo__form">
            <input type="text" className="todo__form-input" placeholder="Add new todo..." onChange={this.handleInput} />
            <button type="submit" className="todo__form-button" onClick={this.handleButton}>
              submit
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default TodoForm;
