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
  SHOW_ALL_TODOS_REQUEST,
  SHOW_ALL_TODOS_SUCCESS,
  SHOW_ACTIVE_TODOS_REQUEST,
  SHOW_ACTIVE_TODOS_SUCCESS,
  SHOW_DONE_TODOS_REQUEST,
  SHOW_DONE_TODOS_SUCCESS,
} from '../constants.js'

class Sagas {
  constructor() {
    eventEmitter.subscribe(ADD_TODO_REQUEST, this.addToodo)
    eventEmitter.subscribe(LOAD_TODO_REQUEST, this.loadTodo)
    eventEmitter.subscribe(DELETE_TODO_REQUEST, this.deleteTodo)
    eventEmitter.subscribe(DELETE_ALL_TODOS_REQUEST, this.deleteAllTodo)
    eventEmitter.subscribe(TOGGLE_TODO_STATUS_REQUEST, this.toggleTodoStatus)
    eventEmitter.subscribe(CHANGE_TODO_REQUEST, this.changeTodo)
    eventEmitter.subscribe(SHOW_ALL_TODOS_REQUEST, this.showAllTodos)
    eventEmitter.subscribe(SHOW_ACTIVE_TODOS_REQUEST, this.showActiveTodos)
    eventEmitter.subscribe(SHOW_DONE_TODOS_REQUEST, this.showDoneTodos)
  }

  loadTodo = () => {
    eventEmitter.emit({
      type: LOAD_TODO_SUCCESS,
      payload: JSON.parse(localStorage.getItem('todos')) || [],
    })
  }

  addToodo = ({ payload }) => {
    const existingTodos = JSON.parse(localStorage.getItem('todos')) || []
    existingTodos.push(payload)
    localStorage.setItem('todos', JSON.stringify(existingTodos))
    eventEmitter.emit({
      type: ADD_TODO_SUCCESS,
      payload,
    })
  }

  deleteTodo = ({ payload }) => {
    const existingTodos = JSON.parse(localStorage.getItem('todos'))
    const todos = existingTodos.filter((todo) => todo.id !== payload)
    localStorage.setItem('todos', JSON.stringify(todos))
    eventEmitter.emit({
      type: DELETE_TODO_SUCCESS,
      payload,
    })
  }

  deleteAllTodo = () => {
    localStorage.removeItem('todos')
    eventEmitter.emit({
      type: DELETE_ALL_TODOS_SUCCESS,
    })
  }

  toggleTodoStatus = ({ payload }) => {
    const existingTodos = JSON.parse(localStorage.getItem('todos'))
    const todos = existingTodos.map((todo) => {
      if (todo.id === payload) {
        return {
          ...todo,
          active: !todo.active,
        }
      }

      return todo
    })

    localStorage.setItem('todos', JSON.stringify(todos))
    eventEmitter.emit({
      type: TOGGLE_TODO_STATUS_SUCCESS,
      payload,
    })
  }

  changeTodo = ({ payload }) => {
    const { todoId, newTodoName } = payload
    const existingTodos = JSON.parse(localStorage.getItem('todos'))
    const todos = existingTodos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          name: newTodoName,
        }
      }

      return todo
    })

    localStorage.setItem('todos', JSON.stringify(todos))
    eventEmitter.emit({
      type: CHANGE_TODO_SUCCESS,
      payload,
    })
  }

  showAllTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || []
    eventEmitter.emit({
      type: SHOW_ALL_TODOS_SUCCESS,
      payload: todos,
    })
  }

  showActiveTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || []
    const activeTodos = todos.filter((todo) => todo.active)
    eventEmitter.emit({
      type: SHOW_ACTIVE_TODOS_SUCCESS,
      payload: activeTodos,
    })
  }

  showDoneTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || []
    const doneTodos = todos.filter((todo) => !todo.active)
    eventEmitter.emit({
      type: SHOW_DONE_TODOS_SUCCESS,
      payload: doneTodos,
    })
  }
}

export default Sagas
