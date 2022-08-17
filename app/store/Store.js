import eventEmitter from './EventEmitter.js'
import {
  ADD_TODO_SUCCESS,
  STATE_UPDATED,
  DELETE_TODO_SUCCESS,
  DELETE_ALL_TODOS_SUCCESS,
  TOGGLE_TODO_STATUS_SUCCESS,
  CHANGE_TODO_SUCCESS,
} from '../constants.js'

class Store {
  constructor() {
    this.state = {
      todos: [],
      activeTodos: 0,
    }

    eventEmitter.subscribe(ADD_TODO_SUCCESS, this.addTodo)
    eventEmitter.subscribe(DELETE_TODO_SUCCESS, this.getModifiedTodos)
    eventEmitter.subscribe(DELETE_ALL_TODOS_SUCCESS, this.getModifiedTodos)
    eventEmitter.subscribe(TOGGLE_TODO_STATUS_SUCCESS, this.getModifiedTodos)
    eventEmitter.subscribe(CHANGE_TODO_SUCCESS, this.getModifiedTodos)
  }

  setState = (newState) => {
    const oldState = this.state
    if (JSON.stringify(newState) !== JSON.stringify(oldState)) {
      this.state = { ...this.state, ...newState }
      eventEmitter.emit({ type: STATE_UPDATED })
      console.log(JSON.stringify(newState) !== JSON.stringify(oldState))
    }
  }

  addTodo = ({ payload }) => {
    const todos = payload ? [...payload] : []
    const newState = {
      ...this.state,
      activeTodos: this.countActiveTodos(todos),
      todos,
    }

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
