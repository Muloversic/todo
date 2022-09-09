import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadTodosRequest } from '../store/actions/todos.js'
import TodosContainer from './TodosContainer'
import TodoFilters from './TodoFilters'

function TodoContent() {
  const dispatch = useDispatch()
  const loadTodosAction = () => dispatch(loadTodosRequest())
  const todos = useSelector((state) => state.todo)
  useEffect(() => {
    loadTodosAction()
  }, [])

  return (
    <>
      <TodoFilters todos={todos} />
      <TodosContainer todos={todos} />
    </>
  )
}

export default TodoContent
