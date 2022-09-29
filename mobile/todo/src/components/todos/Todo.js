import React, { useCallback } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { updateTodoRequest } from '../../store/actions/todos.js'
import { todoItemStyles } from '../../styles/style.js'

const Todo = ({ todo, handleDelete }) => {
  const dispatch = useDispatch()
  const updateTodoAction = (payload) => dispatch(updateTodoRequest(payload))

  const handleTodoStatus = useCallback(() => {
    updateTodoAction({ _id: todo._id, active: !todo.active })
  }, [todo._id, todo.active])

  const handleDeleteTodo = useCallback(() => {
    handleDelete(todo._id)
  }, [])

  return (
    <View style={todoItemStyles.wrapper} id={todo._id} key={todo._id}>
      <Text
        onPress={handleTodoStatus}
        style={{
          fontSize: 18,
          color: '#fff',
          width: '60%',
          textDecorationLine: todo.active ? 'none' : 'line-through',
        }}
      >
        {todo.name}
      </Text>
      <TouchableOpacity onPress={handleDeleteTodo}>
        <Text style={todoItemStyles.actionElem}>x</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Todo
