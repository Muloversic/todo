import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadTodosRequest } from '../../store/actions/todos.js'
import TodosContainer from './TodosContainer'
import TodoFilters from './TodoFilters'

const TodoContent = () => {
  const dispatch = useDispatch()
  const loadTodosAction = (payload) => dispatch(loadTodosRequest(payload))
  const todos = useSelector((state) => state.todo)
  const user = useSelector((state) => state.user)
  useEffect(() => {
    if (user.authenticated) {
      loadTodosAction({ userId: user.indentity._id, filterType: '' })
    }
  }, [user])

  return (
    <>
      <TodoFilters todos={todos} />
      <TodosContainer todos={todos} />
    </>
  )
}

export default TodoContent
