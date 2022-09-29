import React, { useCallback } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { updateFilterRequest, deleteAllTodosRequest } from '../../store/actions/todos.js'
import { todoFilterStyles } from '../../styles/style'

const TodoFilters = ({ todos }) => {
  const dispatch = useDispatch()
  const updateFiltersAction = (payload) => dispatch(updateFilterRequest(payload))
  const deleteAllTodosAction = () => dispatch(deleteAllTodosRequest())
  const filterType = useSelector((state) => state.filter)

  const handleClick = useCallback(
    (filter) => () => {
      updateFiltersAction(filter)
    },
    [],
  )

  const handleDelete = useCallback(() => {
    deleteAllTodosAction()
  }, [])
  return (
    <View style={todoFilterStyles.wrapper}>
      <View style={todoFilterStyles.filtersRow}>
        <TouchableOpacity onPress={handleClick('all')}>
          <Text
            style={{
              color: filterType === 'all' ? 'rgb(129, 134, 218)' : 'black',
              fontSize: 20,
            }}
          >
            All todos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClick('active')}>
          <Text
            style={{
              color: filterType === 'active' ? 'rgb(129, 134, 218)' : 'black',
              fontSize: 20,
            }}
          >
            Active todos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClick('done')}>
          <Text
            style={{
              color: filterType === 'done' ? 'rgb(129, 134, 218)' : 'black',
              fontSize: 20,
            }}
          >
            Done todos
          </Text>
        </TouchableOpacity>
      </View>
      <View style={todoFilterStyles.filtersRow}>
        <Text style={todoFilterStyles.counter}>Todos counter: {todos.length}</Text>
        {todos.length ? (
          <TouchableOpacity onPress={handleDelete}>
            <Text style={todoFilterStyles.removeButton}>Remove all</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}

export default TodoFilters
