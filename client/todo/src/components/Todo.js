import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteTodoRequest, updateTodoRequest } from '../store/actions/todos.js'

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

  editTodo = ({ target }) => {
    this.setState({ inputValue: target.value, error: false })
  }

  handleInputKeys = (e) => {
    const { updateTodoAction, handleCurrentTodo, todo } = this.props
    const { inputValue } = this.state
    const name = inputValue.trim()
    if (e.key === 'Escape') {
      handleCurrentTodo(null)
      this.setState({ error: false })
    }

    if (e.key === 'Enter') {
      if (!name) {
        this.setState({ error: true })
        return
      }

      handleCurrentTodo(null)
      updateTodoAction({ _id: todo._id, name })
    }
  }

  handleTodoStatus = () => {
    const { updateTodoAction, todo } = this.props
    updateTodoAction({ _id: todo._id, active: !todo.active })
  }

  handleDeleteTodo = () => {
    const { deleteTodoAction, todo } = this.props
    deleteTodoAction(todo._id)
  }

  handeEditingMode = () => {
    const { updateTodoAction, handleCurrentTodo, editingTodoId, todo } = this.props
    const { inputValue } = this.state
    const name = inputValue.trim()
    if (editingTodoId === todo._id) {
      if (!name) {
        this.setState({ error: true })
        return
      }

      handleCurrentTodo(null)
      updateTodoAction({ _id: todo._id, name })
      return
    }

    handleCurrentTodo(todo._id)
    this.setState({ inputValue: todo.name })
  }

  render() {
    const { todo, editingTodoId } = this.props
    const { inputValue, error } = this.state
    return (
      <div className="todo__element-wrapper" id={todo._id} key={todo._id}>
        {todo._id === editingTodoId ? (
          <input
            type="text"
            ref={this.inputRef}
            className={`todo__element ${error ? 'todo__element--err' : ''}`}
            value={inputValue}
            onChange={this.editTodo}
            onKeyDown={this.handleInputKeys}
          />
        ) : (
          <span
            className={`todo__element-text ${todo.active ? '' : 'todo__element--done'}`}
            onClick={this.handleTodoStatus}
            onKeyDown={this.handleKeyDown}
            role="button"
            tabIndex="0"
          >
            {todo.name}
          </span>
        )}

        <button
          type="button"
          className="todo__edit todo__action-element"
          onClick={this.handeEditingMode}
        >
          {todo._id === editingTodoId ? <span>&#10004;</span> : <span>&#9998;</span>}
        </button>
        <button
          type="button"
          className="todo__delete todo__action-element"
          onClick={this.handleDeleteTodo}
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
