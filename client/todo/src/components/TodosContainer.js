import React, { useState, useCallback } from 'react'
import Todo from './Todo.js'
import TodoModal from './TodoModal.js'

function TodosContainer({ todos }) {
  const [editingTodoId, setEditingTodoId] = useState(null)
  const [deleteTodoId, setDeleteTodoId] = useState(null)
  const [isDelete, setIsDelete] = useState(false)
  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => setOpen(false), [open])
  const handleDelete = useCallback(() => {
    setOpen(false)
    setIsDelete(true)
  }, [open, isDelete])

  return (
    <div className="todo__items-container">
      {todos.map((todo) => (
        <Todo
          todo={todo}
          key={todo._id}
          handleCurrentTodo={setEditingTodoId}
          deleteTodoId={deleteTodoId}
          setDeleteTodoId={setDeleteTodoId}
          editingTodoId={editingTodoId}
          setOpen={setOpen}
          isDelete={isDelete}
          setIsDelete={setIsDelete}
        />
      ))}
      <TodoModal handleClose={handleClose} handleDelete={handleDelete} open={open} />
    </div>
  )
}

export default TodosContainer
