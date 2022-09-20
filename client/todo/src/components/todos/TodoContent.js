import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadTodosRequest } from '../../store/actions/todos.js'
import TodosContainer from './TodosContainer'
import TodoFilters from './TodoFilters'

const TodoContent = () => {
  const dispatch = useDispatch()
  const loadTodosAction = () => dispatch(loadTodosRequest())
  const todos = useSelector((state) => state.todo)
  const user = useSelector((state) => state.user)
  const [isLoad, setIsLoad] = useState(false)
  useEffect(() => {
    setIsLoad(true)
    loadTodosAction()
    // if (isLoad) {
    // }

    return () => {
      setIsLoad(false)
    }
  }, [user])

  return (
    <>
      <TodoFilters todos={todos} user={user} />
      <TodosContainer todos={todos} />
    </>
  )
}

export default TodoContent
