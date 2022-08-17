import eventEmitter from './EventEmitter.js'
import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS, DELETE_TODO_REQUEST } from '../constants.js'

class Sagas {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
    eventEmitter.subscribe(ADD_TODO_REQUEST, this.addToodo)
    // eventEmitter.subscribe(DELETE_TODO_REQUEST, this.deleteTodo)
  }

  addToodo = ({ payload }) => {
    if (payload) {
      this.todos.push(payload)
      localStorage.setItem('todos', JSON.stringify(this.todos))
    }

    this.sendTodo(ADD_TODO_SUCCESS)
  }

  sendTodo = (eventType) => {
    eventEmitter.emit({
      type: eventType,
      payload: JSON.parse(localStorage.getItem('todos')),
    })
  }
}

export default Sagas
