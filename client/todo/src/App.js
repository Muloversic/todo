import React, { Component } from 'react'
import TodoForm from './components/Form'
import TodoContent from './components/TodoContent'

class App extends Component {
  render() {
    return (
      <div className="todo">
        <TodoForm />
        <TodoContent />
      </div>
    )
  }
}

export default App
