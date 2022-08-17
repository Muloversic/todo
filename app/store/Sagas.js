import eventEmitter from './EventEmitter.js'
import {
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  DELETE_ALL_TODOS_REQUEST,
  DELETE_ALL_TODOS_SUCCESS,
} from '../constants.js'

class Sagas {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
    eventEmitter.subscribe(ADD_TODO_REQUEST, this.addToodo)
    eventEmitter.subscribe(DELETE_TODO_REQUEST, this.deleteTodo)
    eventEmitter.subscribe(DELETE_ALL_TODOS_REQUEST, this.deleteAllTodo)
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

  sendTodo = (eventType) => {
    eventEmitter.emit({
      type: eventType,
      payload: JSON.parse(localStorage.getItem('todos')) || [],
    })
  }
}

export default Sagas
