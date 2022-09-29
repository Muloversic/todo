import React, { useCallback, useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Input } from '@rneui/themed'
import { useDispatch, useSelector } from 'react-redux'
import { addTodoRequest } from '../../store/actions/todos.js'
import { todoFormStyles } from '../../styles/style.js'

const TodoForm = () => {
  const dispatch = useDispatch()
  const addTodoAction = (payload) => dispatch(addTodoRequest(payload))
  const user = useSelector((state) => state.user.indentity)
  const [todoName, setTodoName] = useState('')
  const [error, setError] = useState(false)
  const handleInput = (text) => {
    setTodoName(text)
    setError(false)
  }

  const handleButton = useCallback(() => {
    if (!todoName.trim()) {
      setError(true)
    }

    if (todoName.trim()) {
      const todoObj = {
        name: todoName,
        active: true,
        userId: user._id,
      }

      addTodoAction(todoObj)
      setTodoName('')
    }
  }, [todoName])

  return (
    <View style={todoFormStyles.wrapper}>
      <Text className="todo__heading" style={todoFormStyles.title}>
        todo list
      </Text>
      <View style={todoFormStyles.form}>
        <Input
          label="Add new todo..."
          value={todoName}
          labelStyle={{
            color: error ? todoFormStyles.inputError : todoFormStyles.inputCommonColor,
          }}
          onChangeText={handleInput}
          inputContainerStyle={{
            borderBottomColor: error ? todoFormStyles.inputError : todoFormStyles.inputCommonColor,
            width: '100%',
          }}
        />
        <TouchableOpacity onPress={handleButton}>
          <Text style={todoFormStyles.button}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TodoForm
