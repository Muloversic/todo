import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addTodoRequest } from '../actions/todos.js'

class TodoForm extends Component {
  constructor() {
    super()
    this.state = {
      todoName: '',
      error: false,
    }
  }

  handleInput = (e) => {
    const input = e.target
    this.setState({ error: false })
    this.setState({ todoName: input.value })
  }

  handleButton = (e) => {
    e.preventDefault()
    const { todoName } = this.state
    if (!todoName.trim()) {
      this.setState({ error: true })
    }

    if (todoName.trim()) {
      const todoObj = {
        name: todoName,
        active: true,
      }

      const { addTodoAction } = this.props
      addTodoAction(todoObj)
    }

    this.setState({ todoName: '' })
  }

  render() {
    const { todoName, error } = this.state
    return (
      <div className="todo__form-wrapper">
        <h1 className="todo__heading">todo list</h1>
        <form className="todo__form">
          <input
            type="text"
            className={error ? 'todo__form-input todo__form-input--error' : 'todo__form-input'}
            placeholder="Add new todo..."
            onChange={this.handleInput}
            value={todoName}
          />
          <button type="submit" className="todo__form-button" onClick={this.handleButton}>
            submit
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addTodoAction: (payload) => dispatch(addTodoRequest(payload)),
})

export default connect(null, mapDispatchToProps)(TodoForm)
