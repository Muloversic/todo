import React, { Component } from 'react'
import TodoForm from './TodoForm'
import Todos from './Todos'
import Sagas from '../store/Sagas'
import eventEmitter from '../store/EventEmitter'
import { LOAD_TODO_REQUEST } from '../constants'

// const todoForm = new TodoForm()
const todos = new Todos()
const sagas = new Sagas()

class App extends Component {
  // const app = document.querySelector('#root')
  // const form = todoForm.render()
  // app.append(form)
  // eventEmitter.emit({
  //   type: LOAD_TODO_REQUEST,
  // })
  render() {
    return <TodoForm />
  }
}

export default App
