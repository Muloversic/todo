import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilterRequest, deleteAllTodosRequest } from '../store/actions/todos.js'

function TodoFilters(props) {
  const dispatch = useDispatch()
  const updateFiltersAction = (payload) => dispatch(updateFilterRequest(payload))
  const deleteAllTodosAction = () => dispatch(deleteAllTodosRequest())
  const filterType = useSelector((state) => state.filter)
  const { todos } = props

  const handleClick = useCallback(
    (filter) => () => {
      updateFiltersAction(filter)
    },
    [],
  )

  const deleteAllTodos = useCallback(() => {
    deleteAllTodosAction()
  }, [])

  return (
    <div className="todo__filters">
      <div className="todo__filters-row todo__filters-row--controls">
        <button
          type="button"
          className={`todo__filtres-button ${
            filterType === 'all' ? 'todo__filtres-button--active' : ''
          }`}
          onClick={handleClick('all')}
        >
          All todos
        </button>
        <button
          type="button"
          className={`todo__filtres-button ${
            filterType === 'active' ? 'todo__filtres-button--active' : ''
          }`}
          onClick={handleClick('active')}
        >
          Active todos
        </button>
        <button
          type="button"
          className={`todo__filtres-button ${
            filterType === 'done' ? 'todo__filtres-button--active' : ''
          }`}
          onClick={handleClick('done')}
        >
          Done todos
        </button>
      </div>
      <div className="todo__filters-row">
        <p className="todo__item-counter">Todos counter: {todos.length}</p>
        {todos.length ? (
          <button type="submit" className="todo__remove-all" onClick={deleteAllTodos}>
            Remove all
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default TodoFilters
