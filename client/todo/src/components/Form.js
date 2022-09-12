import React, { useCallback, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { addTodoRequest } from '../store/actions/todos.js'

function TodoForm() {
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
          onChange={handleInput}
          sx={{
            '& label.Mui-focused': {
              color: error ? theme.palette.error.main : theme.palette.todoInput.main,
              top: 0,
            },
            label: {
              top: todoName ? 0 : '-6px',
              color: error ? theme.palette.error.main : theme.palette.common.main,
            },
            '& .MuiOutlinedInput-root': {
              width: '20em',
              '&.Mui-focused fieldset': {
                borderColor: error ? theme.palette.error.main : theme.palette.todoInput.main,
              },
              input: {
                padding: '10px 8px',
              },
              'fieldset, &:hover fieldset': {
                borderColor: error ? theme.palette.error.main : theme.palette.common.main,
              },
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
