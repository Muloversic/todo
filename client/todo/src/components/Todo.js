import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteTodoRequest, updateTodoRequest } from '../actions/todos.js'

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      error: false,
    }
  }

  componentDidMount() {
    const { todo } = this.props
    this.setState({ inputValue: todo.name })
  }

  handleKeyDown = () => {}

  editTodo = (e) => {
    const input = e.target
    this.setState({ inputValue: input.value, error: false })
  }

  handleInputKeys = (e) => {
    const { updateTodoAction, handleCurrentTodo, todo } = this.props
    const { inputValue } = this.state
    if (e.key === 'Escape') {
      handleCurrentTodo()
      this.setState({ error: false })
    }

    if (e.key === 'Enter') {
      if (!inputValue.trim()) {
        this.setState({ error: true })
        return
      }

      handleCurrentTodo()
      updateTodoAction({ _id: todo._id, name: inputValue.trim() })
    }
  }

  handleTodoStatus = (todo) => {
    const { updateTodoAction } = this.props
    updateTodoAction({ _id: todo._id, active: !todo.active })
  }

  handleDeleteTodo = (todo) => {
    const { deleteTodoAction } = this.props
    deleteTodoAction(todo._id)
  }

  handeEditingMode = () => {
    const { updateTodoAction, handleCurrentTodo, todoId, todo } = this.props
    const { inputValue } = this.state
    if (todoId === todo._id) {
      if (!inputValue.trim()) {
        this.setState({ error: true })
        return
      }

      handleCurrentTodo()
      updateTodoAction({ _id: todo._id, name: inputValue.trim() })
      return
    }

    handleCurrentTodo(todo._id)
    this.setState({ inputValue: todo.name })
  }

  render() {
    const { todo, isEditing } = this.props
    const { inputValue, error } = this.state
    return (
      <div className="todo__element-wrapper" id={todo._id} key={todo._id}>
        {isEditing ? (
          <input
            type="text"
            className={error ? 'todo__element todo__element--err' : 'todo__element'}
            name={todo.name}
            value={inputValue}
            onChange={this.editTodo}
            onKeyDown={this.handleInputKeys}
          />
        ) : (
          <span
            className={
              todo.active ? 'todo__element-text' : 'todo__element-text todo__element--done'
            }
            onClick={() => this.handleTodoStatus(todo)}
            onKeyDown={this.handleKeyDown}
            role="button"
            tabIndex="0"
          >
            {todo.name}
          </span>
        )}

        {isEditing ? (
          <button
            type="button"
            className="todo__edit todo__action-element"
            onClick={this.handeEditingMode}
          >
            &#10004;
          </button>
        ) : (
          <button
            type="button"
            className="todo__edit todo__action-element"
            onClick={this.handeEditingMode}
          >
            &#9998;
          </button>
        )}
        <button
          type="button"
          className="todo__delete todo__action-element"
          onClick={() => this.handleDeleteTodo(todo)}
        >
          x
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteTodoAction: (payload) => dispatch(deleteTodoRequest(payload)),
  updateTodoAction: (payload) => dispatch(updateTodoRequest(payload)),
})

export default connect(null, mapDispatchToProps)(Todo)
