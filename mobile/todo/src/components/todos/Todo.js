import React, { useCallback, useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Input } from '@rneui/themed'
import { useDispatch } from 'react-redux'
import { updateTodoRequest } from '../../store/actions/todos.js'
import { todoItemStyles } from '../../styles/style.js'

const Todo = ({ todo, handleDelete, handleCurrentTodo, editingTodoId }) => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState(false)
  const updateTodoAction = (payload) => dispatch(updateTodoRequest(payload))

  const handleTodoStatus = useCallback(() => {
    updateTodoAction({ _id: todo._id, active: !todo.active })
  }, [todo._id, todo.active])

  const handleDeleteTodo = useCallback(() => {
    handleDelete(todo._id)
  }, [])

  const editTodo = useCallback((text) => {
    setInputValue(text)
    setError(false)
  }, [])

  const handeEditingMode = useCallback(() => {
    const name = inputValue.trim()
    if (editingTodoId === todo._id) {
      if (!name) {
        setError(true)
        return
      }

      handleCurrentTodo(null)
      updateTodoAction({ _id: todo._id, name })
      return
    }

    handleCurrentTodo(todo._id)
    setInputValue(todo.name)
  }, [inputValue, todo._id, todo.name, editingTodoId])

  return (
    <View style={todoItemStyles.wrapper} id={todo._id} key={todo._id}>
      {todo._id === editingTodoId ? (
        <Input
          value={inputValue}
          onChangeText={editTodo}
          label={error ? 'Not valid data' : 'Edit input'}
          labelStyle={{ top: -30, position: 'absolute', color: error ? 'red' : 'gray' }}
          inputStyle={todoItemStyles.inputStyle}
          containerStyle={{
            paddingLeft: 0,
            borderBottomColor: error ? 'red' : 'white',
            borderBottomWidth: 2,
            width: '75%',
          }}
          inputContainerStyle={{
            borderBottomWidth: 0,
            width: '75%',
          }}
        />
      ) : (
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
      )}
      <TouchableOpacity onPress={handeEditingMode}>
        {todo._id === editingTodoId ? (
          <Text style={todoItemStyles.submitElem}>&#10004;</Text>
        ) : (
          <Text style={todoItemStyles.editElem}>&#9998;</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleteTodo}>
        <Text style={todoItemStyles.deleteEleme}>x</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Todo
