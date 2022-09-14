import React, { useCallback, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { addTodoRequest } from '../store/actions/todos.js'

const TodoForm = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
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
        <TextField
          id="outlined-basic"
          label="Add new todo..."
          variant="outlined"
          value={todoName}
          error={error}
          onChange={handleInput}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: theme.palette.common.black,
            },
          }}
        />
        <Button type="submit" variant="submit" onClick={handleButton}>
          submit
        </Button>
      </form>
    </div>
  )
}

export default TodoForm
