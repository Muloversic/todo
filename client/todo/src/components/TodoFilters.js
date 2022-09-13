import React, { useCallback, useState } from 'react'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilterRequest, deleteAllTodosRequest } from '../store/actions/todos.js'
import DeleteAllTodoModal from './DeleteAllTodoModal.js'

function TodoFilters({ todos }) {
  const dispatch = useDispatch()
  const theme = useTheme()
  const updateFiltersAction = (payload) => dispatch(updateFilterRequest(payload))
  const deleteAllTodosAction = () => dispatch(deleteAllTodosRequest())
  const filterType = useSelector((state) => state.filter)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const handleClose = useCallback(() => {
    setInputValue('')
    setOpen(false)
  }, [])
  const handleClick = useCallback(
    (filter) => () => {
      updateFiltersAction(filter)
    },
    [],
  )
  const handleDelete = useCallback(() => {
    if (inputValue !== 'delete') {
      setError(true)
      return
    }

    setOpen(false)
    deleteAllTodosAction()
    setInputValue('')
  }, [inputValue])

  const showModal = useCallback(() => {
    setOpen(true)
  }, [])

  const handleInputChange = useCallback(({ target }) => {
    setError(false)
    setInputValue(target.value)
  }, [])

  return (
    <div className="todo__filters">
      <DeleteAllTodoModal
        handleClose={handleClose}
        handleDelete={handleDelete}
        open={open}
        handleInputChange={handleInputChange}
        inputValue={inputValue}
        error={error}
      />
      <div className="todo__filters-row todo__filters-row--controls">
        <Button
          type="submit"
          variant="submit"
          onClick={handleClick('all')}
          sx={{
            backgroundColor:
              filterType === 'all' ? theme.palette.button.active : theme.palette.button.main,
          }}
        >
          All todos
        </Button>
        <Button
          type="submit"
          variant="submit"
          onClick={handleClick('active')}
          sx={{
            backgroundColor:
              filterType === 'active' ? theme.palette.button.active : theme.palette.button.main,
          }}
        >
          Active todos
        </Button>
        <Button
          type="submit"
          variant="submit"
          onClick={handleClick('done')}
          sx={{
            backgroundColor:
              filterType === 'done' ? theme.palette.button.active : theme.palette.button.main,
          }}
        >
          Done todos
        </Button>
      </div>
      <div className="todo__filters-row">
        <p className="todo__item-counter">Todos counter: {todos.length}</p>
        {todos.length ? (
          <button type="submit" className="todo__remove-all" onClick={showModal}>
            Remove all
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default TodoFilters
