import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ADD_TODO_REQUEST } from '../constants.js';
import { addTodoRequest } from '../actions/todos.js';

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

      const { addTodoAction } = this.props;
      addTodoAction(todoObj);
    }

    this.setState({ todoName: '' });
    input.value = '';
  };

  render() {
    return (
      <div className="todo__form-wrapper">
        <h1 className="todo__heading">todo list</h1>
        <form className="todo__form">
          <input type="text" className="todo__form-input" placeholder="Add new todo..." onChange={this.handleInput} />
          <button type="submit" className="todo__form-button" onClick={this.handleButton}>
            submit
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTodoAction: (payload) => dispatch(addTodoRequest(payload)),
});

export default connect(null, mapDispatchToProps)(TodoForm);
