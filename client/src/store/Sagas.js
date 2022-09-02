import axios from 'axios'
import eventEmitter from './EventEmitter.js'
import Store from './Store'
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
    eventEmitter.subscribe(ADD_TODO_REQUEST, this.addTodo)
    eventEmitter.subscribe(LOAD_TODO_REQUEST, this.loadTodo)
    eventEmitter.subscribe(DELETE_TODO_REQUEST, this.deleteTodo)
    eventEmitter.subscribe(DELETE_ALL_TODOS_REQUEST, this.deleteAllTodo)
    eventEmitter.subscribe(UPDATE_TODO_REQUEST, this.updateTodo)
    eventEmitter.subscribe(UPDATE_FILTER_REQUEST, this.updateFilter)
  }

  loadTodo = async () => {
    try {
      const { filterType } = Store.state
      let filter = {}
      if (filterType === 'active') {
        filter = { active: true }
      }

      if (filterType === 'done') {
        filter = { active: false }
      }

      const getAllTodos = await axios.get(`${BASE_URL}`, {
        params: filter,
      })

      const { data } = getAllTodos.data.body
      eventEmitter.emit({
        type: LOAD_TODO_SUCCESS,
        payload: {
          filteredTodos: data,
          filterType,
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  addTodo = async ({ payload }) => {
    try {
      const postTodo = await axios.post(BASE_URL, payload)
      const { data } = postTodo.data.body
      eventEmitter.emit({
        type: ADD_TODO_SUCCESS,
        payload: data,
      })
    } catch (err) {
      console.error('error while creating new todo:', err)
    }
  }

  deleteTodo = async ({ payload }) => {
    try {
      const deleteTodo = await axios.delete(`${BASE_URL}/${payload}`)
      const { data } = deleteTodo.data.body
      eventEmitter.emit({
        type: DELETE_TODO_SUCCESS,
        payload: data._id,
      })
    } catch (err) {
      console.error('error while deleting todo', err)
    }
  }

  deleteAllTodo = async () => {
    try {
      const deleteTodo = await axios.delete(BASE_URL)
      eventEmitter.emit({
        type: DELETE_ALL_TODOS_SUCCESS,
      })
    } catch (err) {
      console.error('error while deleting all todos', err)
    }
  }

  updateTodo = async ({ payload }) => {
    try {
      const updatedTodo = await axios.patch(`${BASE_URL}/${payload._id}`, payload)
      const { data } = updatedTodo.data.body
      eventEmitter.emit({
        type: UPDATE_TODO_SUCCESS,
        payload: data,
      })
    } catch (err) {
      console.error('error while updating todo', err)
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
