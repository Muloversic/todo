import React, { Component } from 'react'
import eventEmitter from '../store/EventEmitter.js'
import store from '../store/Store.js'
import {
  DELETE_TODO_REQUEST,
  DELETE_ALL_TODOS_REQUEST,
  STATE_UPDATED,
  UPDATE_FILTER_REQUEST,
  UPDATE_TODO_REQUEST,
} from '../constants.js'

class Todos extends Component {
  constructor() {
    super()
    this.state = {
      editing: {
        targetId: '',
        inputValue: '',
      },
      todoElements: [],
    }
  }

  componentDidMount() {
    eventEmitter.subscribe(STATE_UPDATED, this.createTodoElements)
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

  handleTodoStatus = (todo) => {
    eventEmitter.emit({
      type: UPDATE_TODO_REQUEST,
      payload: { _id: todo._id, active: !todo.active },
    })
  }

  handleDeleteTodo = (todo) => {
    eventEmitter.emit({ type: DELETE_TODO_REQUEST, payload: todo._id })
  }

  handeEditingMode = (e) => {
    const elementId = e.target.parentElement.id
    const { editing } = this.state
    const input = document.querySelector(`[data-input='${elementId}']`)
    const textLabel = document.querySelector(`[data-label='${elementId}']`)
    const edtiButton = e.target
    input.value = input.name
    input.classList.remove('todo__element--err')
    this.setState((prevState) => ({
      ...prevState,
      editing: { inputValue: input.name, targetId: elementId },
    }))

    const allInputs = document.querySelectorAll('.todo__element')
    const allTextLabels = document.querySelectorAll('.todo__element-text')
    if (elementId === editing.targetId || editing.targetId === '') {
      input.classList.toggle('todo__element--hidden')
      textLabel.classList.toggle('todo__element--hidden')
    }

    if (elementId !== editing.targetId && editing.targetId !== '') {
      ;[...allInputs].forEach((element) => element.classList.add('todo__element--hidden'))
      ;[...allTextLabels].forEach((element) => element.classList.remove('todo__element--hidden'))
      input.classList.remove('todo__element--hidden')
      textLabel.classList.add('todo__element--hidden')
    }

    if (editing.targetId === elementId) {
      this.setState((prevState) => ({
        ...prevState,
        editing: { ...editing, targetId: '' },
      }))
    }

    if (
      ![...input.classList].includes('todo__element--hidden') &&
      elementId !== editing.targetId &&
      editing.targetId !== ''
    ) {
      const allEditBtns = document.querySelectorAll('.todo__edit')
      ;[...allEditBtns].forEach((element) => {
        element.innerHTML = '&#9998;'
      })
    }

    if (![...input.classList].includes('todo__element--hidden')) {
      edtiButton.innerHTML = '&#10004;'
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          input.classList.add('todo__element--hidden')
          textLabel.classList.remove('todo__element--hidden')
          edtiButton.innerHTML = '&#9998;'
        }
      })

      if (editing.inputValue === '') {
        ;[...allInputs].forEach((element) => element.classList.add('todo__element--hidden'))
        ;[...allTextLabels].forEach((element) => element.classList.remove('todo__element--hidden'))
        input.classList.remove('todo__element--hidden')
        textLabel.classList.add('todo__element--hidden')
      }
    }

    if ([...input.classList].includes('todo__element--hidden')) {
      if (editing.inputValue.trim()) {
        edtiButton.innerHTML = '&#9998;'
        eventEmitter.emit({
          type: UPDATE_TODO_REQUEST,
          payload: {
            _id: elementId,
            name: editing.inputValue,
          },
        })
      } else {
        edtiButton.innerHTML = '&#10004;'
        input.value = ''
        input.classList.remove('todo__element--hidden')
        textLabel.classList.add('todo__element--hidden')
        input.classList.add('todo__element--err')
      }
    }
  }

  createTodoElements = () => {
    const { todos, todosCounter } = store.state
    const todoElements = todos.map((todo) => (
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
    ))

    this.changeTodoCounter(todosCounter)
    this.setState({ todoElements })
  }

  processFilterButtons = (filterButton) => {
    const todoFilterButtons = document.querySelector('.todo__filters-row--controls')
    ;[...todoFilterButtons.children].forEach((button) =>
      button.classList.remove('todo__filtres-button--active'),
    )
    filterButton.classList.add('todo__filtres-button--active')
  }

  showAllTodos = (e) => {
    e.preventDefault()
    const filterButton = e.target
    this.processFilterButtons(filterButton)
    eventEmitter.emit({ type: UPDATE_FILTER_REQUEST, payload: 'all' })
  }

  showActiveTodos = (e) => {
    e.preventDefault()
    const filterButton = e.target
    this.processFilterButtons(filterButton)
    eventEmitter.emit({ type: UPDATE_FILTER_REQUEST, payload: 'active' })
  }

  showDoneTodos = (e) => {
    e.preventDefault()
    const filterButton = e.target
    this.processFilterButtons(filterButton)
    eventEmitter.emit({ type: UPDATE_FILTER_REQUEST, payload: 'done' })
  }

  deleteAllTodos = () => {
    eventEmitter.emit({ type: DELETE_ALL_TODOS_REQUEST })
  }

  changeTodoCounter = (num) => {
    const counterItem = document.querySelector('.todo__item-counter')
    if (counterItem) {
      counterItem.textContent = `Todos counter: ${num}`
    }
  }

  render() {
    const { todoElements } = this.state
    return (
      <>
        <div className="todo__filters">
          <div className="todo__filters-row todo__filters-row--controls">
            <button
              type="button"
              className="todo__filtres-button todo__filtres-button--active"
              data-sort="all"
              onClick={this.showAllTodos}
            >
              All todos
            </button>
            <button
              type="button"
              className="todo__filtres-button"
              data-sort="active"
              onClick={this.showActiveTodos}
            >
              Active todos
            </button>
            <button
              type="button"
              className="todo__filtres-button"
              data-sort="done"
              onClick={this.showDoneTodos}
            >
              Done todos
            </button>
          </div>
          <div className="todo__filters-row">
            <p className="todo__item-counter">All todos: 0</p>
            <button
              type="submit"
              className={
                todoElements.length
                  ? 'todo__remove-all'
                  : 'todo__remove-all todo__remove-all--hidden'
              }
              onClick={this.deleteAllTodos}
            >
              Remove all
            </button>
          </div>
        </div>
        <div className="todo__items-container">{todoElements}</div>
      </>
    )
  }
}

export default Todos
