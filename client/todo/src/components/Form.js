import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodoRequest } from '../store/actions/todos.js'

function TodoForm() {
  const dispatch = useDispatch()
  const addTodoAction = (payload) => dispatch(addTodoRequest(payload))
  const [todoName, setTodoName] = useState('')
  const [error, setError] = useState(false)
  const handleInput = ({ target }) => {
    setTodoName(target.value)
    setError(false)
  }

  const handleButton = useCallback(
    (e) => {
      e.preventDefault()
      if (!todoName.trim()) {
        setError(true)
      }

      if (todoName.trim()) {
        const todoObj = {
          name: todoName,
          active: true,
        }

        addTodoAction(todoObj)
        setTodoName('')
      }
    },
    [todoName],
  )

  return (
    <div className="todo__form-wrapper">
      <h1 className="todo__heading">todo list</h1>
      <form className="todo__form">
        <input
          type="text"
          className={`todo__form-input ${error ? 'todo__form-input--error' : ''}`}
          placeholder="Add new todo..."
          onChange={handleInput}
          value={todoName}
        />
        <button type="submit" className="todo__form-button" onClick={handleButton}>
          submit
        </button>
      </form>
    </div>
  )
}

export default TodoForm
