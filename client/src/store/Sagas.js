import axios from 'axios'
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
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_FILTER_REQUEST,
  UPDATE_FILTER_SUCCESS,
} from '../constants.js'

const BASE_URL = 'http://localhost:8080/todos'

class Sagas {
  constructor() {
    eventEmitter.subscribe(ADD_TODO_REQUEST, this.addToodo)
    eventEmitter.subscribe(LOAD_TODO_REQUEST, this.loadTodo)
    eventEmitter.subscribe(DELETE_TODO_REQUEST, this.deleteTodo)
    eventEmitter.subscribe(DELETE_ALL_TODOS_REQUEST, this.deleteAllTodo)
    eventEmitter.subscribe(UPDATE_TODO_REQUEST, this.updateTodo)
    eventEmitter.subscribe(UPDATE_FILTER_REQUEST, this.updateFilter)
  }

  loadTodo = async () => {
    try {
      const filterType = localStorage.getItem('filterType')
      const getAllTodos = await axios.get(`${BASE_URL}/${filterType}`)
      const filteredTodos = getAllTodos.data
      eventEmitter.emit({
        type: LOAD_TODO_SUCCESS,
        payload: {
          filteredTodos,
          filterType,
        },
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  addToodo = async ({ payload }) => {
    try {
      const postTodo = await axios.post(BASE_URL, JSON.stringify(payload))
      eventEmitter.emit({
        type: ADD_TODO_SUCCESS,
        payload: postTodo.data,
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  deleteTodo = async ({ payload }) => {
    try {
      const deleteTodo = await axios.delete(`${BASE_URL}/${payload}`)
      const deletedTodo = deleteTodo.data
      eventEmitter.emit({
        type: DELETE_TODO_SUCCESS,
        payload: deletedTodo._id,
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  deleteAllTodo = async () => {
    try {
      const deleteTodo = await axios.delete(BASE_URL)
      eventEmitter.emit({
        type: DELETE_ALL_TODOS_SUCCESS,
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  updateTodo = async ({ payload }) => {
    try {
      const updatedTodo = await axios.patch(`${BASE_URL}/${payload._id}`, JSON.stringify(payload))
      eventEmitter.emit({
        type: UPDATE_TODO_SUCCESS,
        payload: updatedTodo.data,
      })
    } catch (err) {
      console.error(err.message)
    }
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
