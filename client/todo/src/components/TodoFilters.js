import React, { useCallback, useState } from 'react'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilterRequest, deleteAllTodosRequest } from '../store/actions/todos.js'
import TodoModal from './TodoModal.js'

function TodoFilters({ todos }) {
  const dispatch = useDispatch()
  const theme = useTheme()
  const updateFiltersAction = (payload) => dispatch(updateFilterRequest(payload))
  const deleteAllTodosAction = () => dispatch(deleteAllTodosRequest())
  const filterType = useSelector((state) => state.filter)
  const [open, setOpen] = useState(false)
  const handleClose = useCallback(() => setOpen(false), [open])
  const handleClick = useCallback(
    (filter) => () => {
      updateFiltersAction(filter)
    },
    [],
  )
  const handleDelete = useCallback(() => {
    setOpen(false)
    deleteAllTodosAction()
  }, [open])
  const showModal = useCallback(() => {
    setOpen(true)
  }, [])

  return (
    <div className="todo__filters">
      <TodoModal
        handleClose={handleClose}
        handleDelete={handleDelete}
        open={open}
        title="Delete all todos?"
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
