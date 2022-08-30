import eventEmitter from './EventEmitter.js'
import {
  LOAD_TODO_SUCCESS,
  ADD_TODO_SUCCESS,
  STATE_UPDATED,
  DELETE_TODO_SUCCESS,
  DELETE_ALL_TODOS_SUCCESS,
  UPDATE_FILTER_SUCCESS,
  UPDATE_TODO_SUCCESS,
} from '../constants.js'

class Store {
  constructor() {
    this.state = {
      todos: [],
      todosCounter: 0,
      filterType: 'all',
    }

    eventEmitter.subscribe(LOAD_TODO_SUCCESS, this.loadTodo)
    eventEmitter.subscribe(ADD_TODO_SUCCESS, this.addTodo)
    eventEmitter.subscribe(UPDATE_TODO_SUCCESS, this.updateTodo)
    eventEmitter.subscribe(DELETE_ALL_TODOS_SUCCESS, this.deleteAllTodos)
    eventEmitter.subscribe(DELETE_TODO_SUCCESS, this.deleteTodo)
    eventEmitter.subscribe(UPDATE_FILTER_SUCCESS, this.updateFilter)
  }

  shouldStateUpdate = (newState) => {
    if (newState.todosCounter !== this.state.todosCounter) {
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
  }

  updateFilter = ({ payload }) => {
    this.state = {
      ...this.state,
      filterType: payload,
    }
  }

  loadTodo = ({ payload }) => {
    const { filteredTodos, filterType } = payload
    const todos = filteredTodos ? [...filteredTodos] : []
    const newState = {
      todosCounter: this.todosCounter(todos),
      todos,
      filterType,
    }

    this.setState(newState)
  }

  addTodo = ({ payload }) => {
    const todos = [...this.state.todos, payload]
    const newState = {
      todosCounter: this.todosCounter(todos),
      todos,
    }

    if (this.state.filterType !== 'done') {
      this.setState(newState)
    }
  }

  updateTodo = ({ payload }) => {
    const { filterType } = this.state
    const { _id, name, active } = payload
    let todos = []
    const shouldTodoRemove =
      (filterType === 'active' && !active) || (filterType === 'done' && active)
    if (shouldTodoRemove) {
      todos = this.state.todos.filter((todo) => todo._id !== _id)
    } else {
      todos = this.state.todos.map((todo) => {
        if (todo._id === _id) {
          return {
            ...todo,
            active,
            name,
          }
        }

        return todo
      })
    }

    const newState = {
      todosCounter: this.todosCounter(todos),
      todos,
    }

    this.setState(newState)
  }

  deleteAllTodos = () => {
    const todos = []
    const newState = {
      todosCounter: this.todosCounter(todos),
      todos,
    }

    this.setState(newState)
  }

  deleteTodo = ({ payload }) => {
    const todos = this.state.todos.filter((todo) => todo._id !== payload)
    const newState = {
      todosCounter: this.todosCounter(todos),
      todos,
    }

    this.setState(newState)
  }

  todosCounter = (todos) => todos.length
}

const store = new Store()
export default store
