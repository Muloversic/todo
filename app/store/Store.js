import eventEmitter from './EventEmitter.js'
import {
  LOAD_TODO_SUCCESS,
  ADD_TODO_SUCCESS,
  STATE_UPDATED,
  DELETE_TODO_SUCCESS,
  DELETE_ALL_TODOS_SUCCESS,
  TOGGLE_TODO_STATUS_SUCCESS,
  CHANGE_TODO_SUCCESS,
  CHANGE_TODO_REQUEST,
} from '../constants.js'

class Store {
  constructor() {
    this.state = {
      todos: [],
      activeTodos: 0,
    }

    eventEmitter.subscribe(LOAD_TODO_SUCCESS, this.loadTodo)
    eventEmitter.subscribe(ADD_TODO_SUCCESS, this.addTodo)
    eventEmitter.subscribe(CHANGE_TODO_REQUEST, this.changeTodo)
    eventEmitter.subscribe(DELETE_TODO_SUCCESS, this.getModifiedTodos)
    eventEmitter.subscribe(DELETE_ALL_TODOS_SUCCESS, this.getModifiedTodos)
    eventEmitter.subscribe(TOGGLE_TODO_STATUS_SUCCESS, this.getModifiedTodos)
  }

  shouldStateUpdate = (newState) => {
    if (newState.activeTodos !== this.state.activeTodos) {
      return true
    }

    if (newState.todos.length !== this.state.todos.length) {
      return true
    }

    let isDifferent = false
    const oldTodos = this.state.todos
    const newTodos = newState.todos
    newTodos.forEach((newTodo, i) => {
      const todoKeys = Object.keys(newTodo)
      const isUpdated = !todoKeys.every((key) => newTodo[key] === oldTodos[i][key])
      if (isUpdated) {
        isDifferent = true
      }
    })

    return isDifferent
  }

  setState = (newState) => {
    const stateToUpdate = { ...this.state, ...newState }
    const shouldUpdate = this.shouldStateUpdate(stateToUpdate)
    if (shouldUpdate) {
      this.state = {
        ...stateToUpdate,
      }
      eventEmitter.emit({ type: STATE_UPDATED })
    }

    console.log(shouldUpdate)
  }

  loadTodo = ({ payload }) => {
    const todos = payload ? [...payload] : []
    const newState = {
      ...this.state,
      activeTodos: this.countActiveTodos(todos),
      todos,
    }

    this.setState(newState)
  }

  addTodo = ({ payload }) => {
    const todos = payload
    const newState = {
      ...this.state,
      activeTodos: this.countActiveTodos(todos),
      todos,
    }

    this.setState(newState)
  }

  changeTodo = ({ payload }) => {
    const { todoId, newTodoName } = payload
    const todos = [...this.state.todos].map((todo) => {
      if (todo.id === todoId) {
        todo.name = newTodoName
      }

      return todo
    })

    const newState = {
      ...this.state,
      activeTodos: this.countActiveTodos(todos),
      todos,
    }

    console.log(this.state)

    this.setState(newState)
  }

  getModifiedTodos = ({ payload }) => {
    const newState = {
      ...this.state,
      activeTodos: this.countActiveTodos(payload),
      todos: payload,
    }

    this.setState(newState)
  }

  countActiveTodos = (todos) => {
    const activeTodosArr = todos.filter((todo) => todo.active)
    const activeTodos = activeTodosArr.length
    return activeTodos
  }
}

const store = new Store()
export default store
