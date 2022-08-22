import eventEmitter from '../store/EventEmitter.js'
import store from '../store/Store.js'
import {
  DELETE_TODO_REQUEST,
  DELETE_ALL_TODOS_REQUEST,
  TOGGLE_TODO_STATUS_REQUEST,
  CHANGE_TODO_REQUEST,
  STATE_UPDATED,
  UPDATE_FILTER_REQUEST,
} from '../constants.js'
import { createElement } from '../helpers.js'

class Todos {
  constructor() {
    this.todoContainer = this.createTodosContainer()
    this.todoFiltersContainer = this.createFiltersContainer()
    this.createFiltersElements()
    eventEmitter.subscribe(STATE_UPDATED, this.processTodos)
  }

  createFiltersContainer = () => {
    // _todo info bar
    const todoFilters = createElement('div', 'todo__filters')
    return todoFilters
  }

  createFiltersElements = () => {
    const todoFilterButtons = createElement('div', 'todo__filters-row')
    const todoFiltersInfo = createElement('div', 'todo__filters-row')

    // filter buttons
    const showAllTodosButton = createElement(
      'button',
      ['todo__filtres-button', 'todo__filtres-button--active'],
      'All todos',
    )

    showAllTodosButton.addEventListener('click', (e) => {
      e.preventDefault()
      ;[...todoFilterButtons.children].forEach((button) =>
        button.classList.remove('todo__filtres-button--active'),
      )
      showAllTodosButton.classList.add('todo__filtres-button--active')
      eventEmitter.emit({ type: UPDATE_FILTER_REQUEST, payload: 'all' })
    })

    const showActiveTodos = createElement('button', 'todo__filtres-button', 'Active todos')
    showActiveTodos.addEventListener('click', (e) => {
      e.preventDefault()
      ;[...todoFilterButtons.children].forEach((button) =>
        button.classList.remove('todo__filtres-button--active'),
      )
      showActiveTodos.classList.add('todo__filtres-button--active')
      eventEmitter.emit({ type: UPDATE_FILTER_REQUEST, payload: 'active' })
    })

    const showDoneTodos = createElement('button', 'todo__filtres-button', 'Done todos')
    showDoneTodos.addEventListener('click', (e) => {
      e.preventDefault()
      ;[...todoFilterButtons.children].forEach((button) =>
        button.classList.remove('todo__filtres-button--active'),
      )
      showDoneTodos.classList.add('todo__filtres-button--active')
      eventEmitter.emit({ type: UPDATE_FILTER_REQUEST, payload: 'done' })
    })

    // append buttons
    todoFilterButtons.append(...[showAllTodosButton, showActiveTodos, showDoneTodos])
    // _todos counter at info bar
    const todoItemCounter = createElement('p', 'todo__item-counter', 'All todos: 0')

    // remove all todo btn
    const removeAllButton = createElement('button', 'todo__remove-all', 'Remove all')
    removeAllButton.addEventListener('click', () =>
      eventEmitter.emit({ type: DELETE_ALL_TODOS_REQUEST }),
    )

    // append 'counter' and 'remove todo button' to info bar
    todoFiltersInfo.append(...[todoItemCounter, removeAllButton])
    this.todoFiltersContainer.append(...[todoFilterButtons, todoFiltersInfo])
  }

  createTodosContainer = () => {
    const todosContaienr = createElement('div', 'todo__items-container')
    return todosContaienr
  }

  changeTodoCounter = (num) => {
    const counterItem = document.querySelector('.todo__item-counter')
    if (counterItem) {
      counterItem.textContent = `Todos counter: ${num}`
    }
  }

  createTodoElement = (todo) => {
    // render todo
    const todoWrapper = createElement('div', 'todo__element-wrapper', '', [{ id: todo.id }])

    // create input and its attrs
    const todoItemInput = createElement('input', ['todo__element', 'todo__element--hidden'], '', [
      { name: todo.name },
    ])
    todoItemInput.value = todo.name

    const todoItemText = createElement('span', 'todo__element-text', todo.name)

    if (!todo.active) {
      todoItemText.classList.add('todo__element--done')
    }

    // create edit button
    const editButton = createElement('span', ['todo__edit', 'todo__action-element'])
    editButton.innerHTML = '&#9998;'

    // create delete button
    const deleteButton = createElement('span', ['todo__delete', 'todo__action-element'], 'x')

    // add toggle todo status listener for todo wrapper
    let isEditing = false
    todoWrapper.addEventListener('click', (event) => {
      const todoId = +event.target.parentElement.id
      if (event.target === todoItemText && !isEditing) {
        eventEmitter.emit({ type: TOGGLE_TODO_STATUS_REQUEST, payload: todoId })
      }

      if (event.target === editButton) {
        // _!isEditing means input is editable
        if (todoItemInput.value !== '') {
          isEditing = !isEditing
        }

        // flip isEditing state if esc was pressed
        todoItemInput.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' || e.key === 'Enter') {
            isEditing = false
          }
        })

        this.editTodo(editButton, todoItemInput, todoItemText, todo.id, isEditing)
      }

      if (event.target === deleteButton) {
        eventEmitter.emit({ type: DELETE_TODO_REQUEST, payload: todoId })
      }
    })

    // append todo item+action button to wrapper, append wrappers to container
    todoWrapper.append(...[todoItemInput, todoItemText, editButton, deleteButton])
    this.todoContainer.append(todoWrapper)
  }

  editTodo(button, todoItemInput, todoItemText, todoId, isEditing) {
    const confirmTodoChanges = () => {
      todoItemInput.classList.toggle('todo__element--hidden')
      todoItemText.classList.toggle('todo__element--hidden')
      button.innerHTML = '&#9998;'
      todoItemInput.classList.remove('todo__element--err')
      todoItemInput.name = todoItemInput.value
      eventEmitter.emit({
        type: CHANGE_TODO_REQUEST,
        payload: {
          todoId,
          newTodoName: todoItemInput.value.trim(),
        },
      })
    }

    const initialTodoValue = todoItemInput.name
    todoItemInput.addEventListener('keydown', (e) => {
      // if escape was pressed set initial value to input.value and to arr with edited todo
      // works only if input value is not empty
      if (e.key === 'Escape' && todoItemInput.value.trim() !== '') {
        todoItemInput.classList.add('todo__element--hidden')
        todoItemText.classList.remove('todo__element--hidden')
        button.innerHTML = '&#9998;'
        todoItemInput.value = initialTodoValue
        todoItemInput.name = initialTodoValue
        todoItemInput.classList.remove('todo__element--err')
      }

      if (e.key === 'Enter' && todoItemInput.value.trim() !== '') {
        console.log('enter submit')
        confirmTodoChanges()
      }
    })

    // make todo editable
    if (isEditing) {
      button.innerHTML = '&#10004;'
      if (todoItemInput.value.trim() !== '') {
        todoItemInput.classList.toggle('todo__element--hidden')
        todoItemText.classList.toggle('todo__element--hidden')
      }
    } else {
      button.innerHTML = '&#9998;'
    }

    // check if it's editing state and value is not empty save edited todo and disable input
    if (!isEditing && todoItemInput.value.trim() !== '') {
      confirmTodoChanges()
    }

    // if input is empty make its border red
    if (todoItemInput.value.trim() === '') {
      todoItemInput.classList.add('todo__element--err')
    }
  }

  processTodos = () => {
    const { state } = store
    const { todos, activeTodos } = state
    ;[...this.todoContainer.children].forEach((todo) => todo.remove())
    todos.forEach((todo) => this.createTodoElement(todo))
    this.render()
    this.changeTodoCounter(activeTodos)
  }

  render() {
    const todoBody = document.querySelector('.todo')
    if (todoBody.children.length <= 1) {
      todoBody.append(...[this.todoFiltersContainer, this.todoContainer])
    }
  }
}

export default Todos
