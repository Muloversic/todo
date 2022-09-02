import React, { Component } from 'react'
import TodoForm from './TodoForm'
import Todos from './Todos'
import Sagas from '../store/Sagas'
import eventEmitter from '../store/EventEmitter'
import { LOAD_TODO_REQUEST } from '../constants'

const sagas = new Sagas()

class App extends Component {
  render() {
    eventEmitter.emit({
      type: LOAD_TODO_REQUEST,
    })
    return (
      <TodoForm>
        <Todos />
      </TodoForm>
    )
  }
}

export default App
