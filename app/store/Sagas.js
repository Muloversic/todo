import eventEmitter from './EventEmitter.js'
import {
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  LOAD_TODO_REQUEST,
  LOAD_TODO_SUCCESS,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_ALL_TODOS_REQUEST,
  DELETE_ALL_TODOS_SUCCESS,
  TOGGLE_TODO_STATUS_REQUEST,
  TOGGLE_TODO_STATUS_SUCCESS,
  CHANGE_TODO_REQUEST,
  CHANGE_TODO_SUCCESS,
} from '../constants.js'

class Sagas {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
    eventEmitter.subscribe(ADD_TODO_REQUEST, this.addToodo)
    eventEmitter.subscribe(LOAD_TODO_REQUEST, this.loadTodo)
    eventEmitter.subscribe(DELETE_TODO_REQUEST, this.deleteTodo)
    eventEmitter.subscribe(DELETE_ALL_TODOS_REQUEST, this.deleteAllTodo)
    eventEmitter.subscribe(TOGGLE_TODO_STATUS_REQUEST, this.toggleTodoStatus)
    eventEmitter.subscribe(CHANGE_TODO_REQUEST, this.changeTodo)
  }

  loadTodo = () => {
    eventEmitter.emit({
      type: LOAD_TODO_SUCCESS,
      payload: JSON.parse(localStorage.getItem('todos')) || [],
    })
  }

  addToodo = ({ payload }) => {
    if (payload) {
      this.todos.push(payload)
      localStorage.setItem('todos', JSON.stringify(this.todos))
    }

    this.sendTodo(ADD_TODO_SUCCESS)
  }

  deleteTodo = ({ payload }) => {
    this.todos = this.todos.filter((todo) => todo.id !== payload)
    localStorage.setItem('todos', JSON.stringify(this.todos))
    this.sendTodo(DELETE_TODO_SUCCESS)
  }

  deleteAllTodo = () => {
    this.todos = []
    localStorage.removeItem('todos')
    this.sendTodo(DELETE_ALL_TODOS_SUCCESS)
  }

  toggleTodoStatus = ({ payload }) => {
    this.todos = this.todos.map((todo) => {
      if (todo.id === payload) {
        todo.active = !todo.active
      }

      return todo
    })

    localStorage.setItem('todos', JSON.stringify(this.todos))
    this.sendTodo(TOGGLE_TODO_STATUS_SUCCESS)
  }

  changeTodo = ({ payload }) => {
    const { todoId, newTodoName } = payload
    this.todos = this.todos.map((todo) => {
      if (todo.id === todoId) {
        todo.name = newTodoName
      }

      return todo
    })

    localStorage.setItem('todos', JSON.stringify(this.todos))
    this.sendTodo(CHANGE_TODO_SUCCESS)
  }

  sendTodo = (eventType) => {
    eventEmitter.emit({
      type: eventType,
      payload: JSON.parse(localStorage.getItem('todos')) || [],
    })
  }
}

export default Sagas
