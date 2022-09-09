import React from 'react'
import TodoForm from './components/Form'
import TodoContent from './components/TodoContent'

function App() {
  return (
    <div className="todo">
      <TodoForm />
      <TodoContent />
    </div>
  )
}

export default App
