import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodoRequest, updateTodoRequest } from '../store/actions/todos.js'

function Todo(props) {
  const dispatch = useDispatch()
  const deleteTodoAction = (payload) => dispatch(deleteTodoRequest(payload))
  const updateTodoAction = (payload) => dispatch(updateTodoRequest(payload))
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(false)
  const { todo, editingTodoId, handleCurrentTodo } = props

  const handleKeyDown = () => {}
  const editTodo = ({ target }) => {
    setInputValue(target.value)
    setError(false)
  }

  const handleInputKeys = (e) => {
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
  }

  const handleTodoStatus = () => {
    const { updateTodoAction, todo } = props
    updateTodoAction({ _id: todo._id, active: !todo.active })
  }

  const handleDeleteTodo = () => {
    deleteTodoAction(todo._id)
  }

  const handeEditingMode = () => {
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
  }

  return (
    <div className="todo__element-wrapper" id={todo._id} key={todo._id}>
      {todo._id === editingTodoId ? (
        <input
          type="text"
          className={`todo__element ${error ? 'todo__element--err' : ''}`}
          value={inputValue}
          onChange={editTodo}
          onKeyDown={handleInputKeys}
        />
      ) : (
        <span
          className={`todo__element-text ${todo.active ? '' : 'todo__element--done'}`}
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
