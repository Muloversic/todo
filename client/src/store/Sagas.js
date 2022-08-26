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

  loadTodo = async () => {
    const getAllTodos = await axios.get('http://localhost:8080/todos')
    const todos = getAllTodos.data
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
      payload: {
        filteredTodos,
        filterType,
      },
    })
  }

  addToodo = async ({ payload }) => {
    const postTodo = await axios.post('http://localhost:8080/todos', JSON.stringify(payload))
    eventEmitter.emit({
      type: ADD_TODO_SUCCESS,
      payload: postTodo.data,
    })
  }

  deleteTodo = async ({ payload }) => {
    const deleteTodo = await axios.delete(`http://localhost:8080/todos/${payload}`)
    const deletedTodo = deleteTodo.data
    eventEmitter.emit({
      type: DELETE_TODO_SUCCESS,
      payload: deletedTodo._id,
    })
  }

  deleteAllTodo = async () => {
    const deleteTodo = await axios.delete(`http://localhost:8080/todos`)
    eventEmitter.emit({
      type: DELETE_ALL_TODOS_SUCCESS,
    })
  }

  toggleTodoStatus = async ({ payload }) => {
    const updatedTodo = await axios.patch(
      `http://localhost:8080/todos/${payload._id}`,
      JSON.stringify(payload),
    )
    console.log(updatedTodo.data)
    const { _id, active } = updatedTodo.data
    eventEmitter.emit({
      type: TOGGLE_TODO_STATUS_SUCCESS,
      payload: {
        todoId: _id,
        todoActive: active,
      },
    })
  }

  changeTodo = async ({ payload }) => {
    const updatedTodo = await axios.patch(
      `http://localhost:8080/todos/${payload._id}`,
      JSON.stringify(payload),
    )

    const { _id, name } = updatedTodo.data
    eventEmitter.emit({
      type: CHANGE_TODO_SUCCESS,
      payload: { todoId: _id, newTodoName: name },
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
