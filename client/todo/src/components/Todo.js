import React, { Component } from 'react';

class Todo extends Component {
  render() {
    const { todo } = this.props;
    return (
      <div className="todo__element-wrapper" id={todo._id} key={todo._id}>
        <input
          type="text"
          className="todo__element todo__element--hidden"
          name={todo.name}
          data-input={todo._id}
          onChange={this.editTodo}
        />
        <span
          className={todo.active ? 'todo__element-text' : 'todo__element-text todo__element--done'}
          onClick={() => this.handleTodoStatus(todo)}
          onKeyDown={this.handleKeyDown}
          role="button"
          tabIndex="0"
          data-label={todo._id}
        >
          {todo.name}
        </span>
        <button type="button" className="todo__edit todo__action-element" onClick={this.handeEditingMode}>
          &#9998;
        </button>
        <button type="button" className="todo__delete todo__action-element" onClick={() => this.handleDeleteTodo(todo)}>
          x
        </button>
      </div>
    );
  }
}

export default Todo;
