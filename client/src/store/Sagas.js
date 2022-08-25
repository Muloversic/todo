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
  UPDATE_FILTER_REQUEST,
  UPDATE_FILTER_SUCCESS,
} from '../constants.js'

const axios = require('axios').default

class Sagas {
  constructor() {
    eventEmitter.subscribe(ADD_TODO_REQUEST, this.addToodo)
    eventEmitter.subscribe(LOAD_TODO_REQUEST, this.loadTodo)
    eventEmitter.subscribe(DELETE_TODO_REQUEST, this.deleteTodo)
    eventEmitter.subscribe(DELETE_ALL_TODOS_REQUEST, this.deleteAllTodo)
    eventEmitter.subscribe(TOGGLE_TODO_STATUS_REQUEST, this.toggleTodoStatus)
    eventEmitter.subscribe(CHANGE_TODO_REQUEST, this.changeTodo)
    eventEmitter.subscribe(UPDATE_FILTER_REQUEST, this.updateFilter)
  }

  loadTodo = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || []
    const filterType = localStorage.getItem('filterType')
    let filteredTodos = todos
    if (filterType === 'done') {
      filteredTodos = todos.filter((todo) => !todo.active)
    }

    if (filterType === 'active') {
      filteredTodos = todos.filter((todo) => todo.active)
    }

    eventEmitter.emit({
      type: LOAD_TODO_SUCCESS,
      payload: filteredTodos,
    })
  }

  addToodo = async ({ payload }) => {
    const postTodo = await axios.post('http://localhost:8080/todos/add', JSON.stringify(payload))
    console.log(postTodo.data)

    const existingTodos = JSON.parse(localStorage.getItem('todos')) || []
    existingTodos.push(postTodo.data)
    localStorage.setItem('todos', JSON.stringify(existingTodos))
    eventEmitter.emit({
      type: ADD_TODO_SUCCESS,
      payload: postTodo.data,
    })
  }

  deleteTodo = ({ payload }) => {
    const existingTodos = JSON.parse(localStorage.getItem('todos'))
    const todos = existingTodos.filter((todo) => todo._id !== payload)
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
      if (todo._id === payload) {
        return {
          ...todo,
          active: !todo.active,
        }
      }

      return todo
    })

    const toggledTodo = todos.find((todo) => todo._id === payload)
    localStorage.setItem('todos', JSON.stringify(todos))
    eventEmitter.emit({
      type: TOGGLE_TODO_STATUS_SUCCESS,
      payload: {
        todoId: toggledTodo._id,
        todoActive: toggledTodo.active,
      },
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

  updateFilter = ({ payload }) => {
    localStorage.setItem('filterType', payload)
    eventEmitter.emit({ type: UPDATE_FILTER_SUCCESS, payload })
    eventEmitter.emit({
      type: LOAD_TODO_REQUEST,
    })
  }
}

export default Sagas
