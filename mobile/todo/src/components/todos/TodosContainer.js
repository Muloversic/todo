import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { View } from 'react-native'
import { deleteTodoRequest } from '../../store/actions/todos.js'
import Todo from './Todo.js'
import { todoItemStyles } from '../../styles/style.js'

const TodosContainer = ({ todos }) => {
  const dispatch = useDispatch()
  const deleteTodoAction = (payload) => dispatch(deleteTodoRequest(payload))
  const handleDelete = useCallback((deleteTodoId) => {
    deleteTodoAction(deleteTodoId)
  }, [])

  return (
    <View style={todoItemStyles.todosContainer}>
      {todos.map((todo) => (
        <Todo key={todo._id} todo={todo} handleDelete={handleDelete} />
      ))}
    </View>
  )
}

export default TodosContainer
