import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodoRequest, updateTodoRequest } from '../store/actions/todos.js'
import Todo from './Todo.js'
import TodoModal from './TodoModal.js'

function TodosContainer({ todos }) {
  const dispatch = useDispatch()
  const deleteTodoAction = (payload) => dispatch(deleteTodoRequest(payload))
  const [editingTodoId, setEditingTodoId] = useState(null)
  const [deleteTodoId, setDeleteTodoId] = useState(null)
  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => setOpen(false), [])
  const handleDelete = useCallback(() => {
    deleteTodoAction(deleteTodoId)
    setOpen(false)
  }, [deleteTodoId])

  return (
    <div className="todo__items-container">
      {todos.map((todo) => (
        <Todo
          todo={todo}
          key={todo._id}
          handleCurrentTodo={setEditingTodoId}
          setDeleteTodoId={setDeleteTodoId}
          editingTodoId={editingTodoId}
          setOpen={setOpen}
        />
      ))}
      <TodoModal
        handleClose={handleClose}
        handleDelete={handleDelete}
        open={open}
        title="Delete todo?"
      />
    </div>
  )
}

export default TodosContainer
