import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodoRequest } from '../../store/actions/todos.js'
import Todo from './Todo.js'
import DeleteTodoModal from './DeleteTodoModal.js'

const TodosContainer = ({ todos }) => {
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
      <DeleteTodoModal handleClose={handleClose} handleDelete={handleDelete} open={open} />
    </div>
  )
}

export default TodosContainer
