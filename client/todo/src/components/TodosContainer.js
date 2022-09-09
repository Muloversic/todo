import React, { useState } from 'react'
import Todo from './Todo.js'

function TodosContainer(props) {
  const [editingTodoId, setEditingTodoId] = useState(null)
  const { todos } = props
  return (
    <div className="todo__items-container">
      {todos.map((todo) => (
        <Todo
          todo={todo}
          key={todo._id}
          handleCurrentTodo={setEditingTodoId}
          editingTodoId={editingTodoId}
        />
      ))}
    </div>
  )
}

export default TodosContainer
