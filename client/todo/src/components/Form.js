import React, { useCallback, useState } from 'react'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { addTodoRequest } from '../store/actions/todos.js'

function TodoForm(props) {
  const dispatch = useDispatch()
  const theme = useTheme()
  const addTodoAction = (payload) => dispatch(addTodoRequest(payload))
  const [todoName, setTodoName] = useState('')
  const [error, setError] = useState(false)
  const handleInput = ({ target }) => {
    setTodoName(target.value)
    setError(false)
  }
  //   console.log(theme)
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
              color: error ? theme.palette.error.main : theme.palette.todoForm.main,
              top: 0,
            },
            label: {
              top: '-6px',
              color: error ? theme.palette.error.main : theme.palette.common.main,
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: error ? theme.palette.error.main : theme.palette.todoForm.main,
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
        <button type="submit" className="todo__form-button" onClick={handleButton}>
          submit
        </button>
      </form>
    </div>
  )
}

export default TodoForm
