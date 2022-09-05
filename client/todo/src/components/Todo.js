import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteTodoRequest, updateTodoRequest } from '../actions/todos.js'

class Todo extends Component {
  constructor() {
    super()
    this.state = {
      editing: {
        targetId: '',
        inputValue: '',
      },
    }
  }

  handleKeyDown = () => {}

  editTodo = (e) => {
    const { editing } = this.state
    const input = e.target
    this.setState((prevState) => ({
      ...prevState,
      editing: { ...editing, inputValue: input.value.trim() },
    }))
  }

  handleInputKeys = (e) => {
    const { updateTodoAction } = this.props
    const { editing } = this.state
    const elementId = e.target.parentElement.id
    const input = document.querySelector(`[data-input='${elementId}']`)
    const textLabel = document.querySelector(`[data-label='${elementId}']`)
    const allEditBtns = document.querySelectorAll('.todo__edit')
    if (e.key === 'Escape') {
      input.classList.add('todo__element--hidden')
      textLabel.classList.remove('todo__element--hidden')
      ;[...allEditBtns].forEach((element) => {
        element.innerHTML = '&#9998;'
      })
    }

    if (e.key === 'Enter' && input.value.trim() !== '') {
      input.classList.add('todo__element--hidden')
      textLabel.classList.remove('todo__element--hidden')
      ;[...allEditBtns].forEach((element) => {
        element.innerHTML = '&#9998;'
      })
      updateTodoAction({ _id: elementId, name: editing.inputValue })
    } else {
      input.classList.add('todo__element--err')
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

  handeEditingMode = (e) => {
    const { updateTodoAction } = this.props
    const { editing } = this.state
    const elementId = e.target.parentElement.id
    const input = document.querySelector(`[data-input='${elementId}']`)
    const textLabel = document.querySelector(`[data-label='${elementId}']`)
    const edtiButton = e.target
    const allInputs = document.querySelectorAll('.todo__element')
    const allTextLabels = document.querySelectorAll('.todo__element-text')
    const allEditBtns = document.querySelectorAll('.todo__edit')
    if ([...input.classList].includes('todo__element--hidden')) {
      ;[...allInputs].forEach((element) => element.classList.add('todo__element--hidden'))
      ;[...allTextLabels].forEach((element) => element.classList.remove('todo__element--hidden'))
      ;[...allEditBtns].forEach((element) => {
        element.innerHTML = '&#9998;'
      })

      this.setState((prevState) => ({
        ...prevState,
        editing: { inputValue: input.name, targetId: elementId },
      }))

      input.classList.remove('todo__element--err')
      input.classList.remove('todo__element--hidden')
      textLabel.classList.add('todo__element--hidden')
      edtiButton.innerHTML = '&#10004;'
      input.value = input.name
    } else {
      submitChanging()
    }

    function submitChanging() {
      if (editing.inputValue !== '') {
        input.classList.add('todo__element--hidden')
        textLabel.classList.remove('todo__element--hidden')
        edtiButton.innerHTML = '&#9998;'
        updateTodoAction({ _id: elementId, name: editing.inputValue })
      }

      if (editing.inputValue === '') {
        input.classList.add('todo__element--err')
      }
    }
  }

  render() {
    const { todo } = this.props
    return (
      <div className="todo__element-wrapper" id={todo._id} key={todo._id}>
        <input
          type="text"
          className="todo__element todo__element--hidden"
          name={todo.name}
          data-input={todo._id}
          onChange={this.editTodo}
          onKeyDown={this.handleInputKeys}
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
        <button
          type="button"
          className="todo__edit todo__action-element"
          onClick={this.handeEditingMode}
        >
          &#9998;
        </button>
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
