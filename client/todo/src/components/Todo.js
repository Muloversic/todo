import React, { useCallback, useMemo, useState } from 'react'
import { TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { updateTodoRequest } from '../store/actions/todos.js'

function Todo({ todo, editingTodoId, handleCurrentTodo, setOpen, setDeleteTodoId }) {
  const dispatch = useDispatch()
  const updateTodoAction = (payload) => dispatch(updateTodoRequest(payload))
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(false)

  const handleKeyDown = useCallback(() => {}, [])
  const editTodo = useCallback(({ target }) => {
    setInputValue(target.value)
    setError(false)
  }, [])

  const handleInputKeys = useCallback(
    (e) => {
      const name = inputValue.trim()
      if (e.key === 'Escape') {
        handleCurrentTodo(null)
        setError(false)
      }

      if (e.key === 'Enter') {
        if (!name) {
          setError(true)
          return
        }

        handleCurrentTodo(null)
        updateTodoAction({ _id: todo._id, name })
      }
    },
    [inputValue, todo._id],
  )

  const handleTodoStatus = useCallback(() => {
    updateTodoAction({ _id: todo._id, active: !todo.active })
  }, [todo._id, todo.active])

  const handleDeleteTodo = useCallback(() => {
    setDeleteTodoId(todo._id)
    setOpen(true)
  }, [])

  const handeEditingMode = useCallback(() => {
    const name = inputValue.trim()
    if (editingTodoId === todo._id) {
      if (!name) {
        setError(true)
        return
      }

      handleCurrentTodo(null)
      updateTodoAction({ _id: todo._id, name })
      return
    }

    handleCurrentTodo(todo._id)
    setInputValue(todo.name)
  }, [inputValue, todo._id, todo.name, editingTodoId])

  const spanStyles = useMemo(
    () => (todo.active ? 'todo__element-text' : 'todo__element-text todo__element--done'),
    [todo.active],
  )

  return (
    <div className="todo__element-wrapper" id={todo._id} key={todo._id}>
      {todo._id === editingTodoId ? (
        <TextField
          id="outlined-basic"
          label="Edit todo"
          variant="outlined"
          value={inputValue}
          onChange={editTodo}
          onKeyDown={handleInputKeys}
          error={error}
        />
      ) : (
        <span
          className={spanStyles}
          onClick={handleTodoStatus}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex="0"
        >
          {todo.name}
        </span>
      )}

      <button type="button" className="todo__edit todo__action-element" onClick={handeEditingMode}>
        {todo._id === editingTodoId ? <span>&#10004;</span> : <span>&#9998;</span>}
      </button>
      <button
        type="button"
        className="todo__delete todo__action-element"
        onClick={handleDeleteTodo}
      >
        x
      </button>
    </div>
  )
}

export default Todo
