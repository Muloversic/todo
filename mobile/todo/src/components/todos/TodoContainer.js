import React from 'react'
import { View, TouchableHighlight, TouchableOpacity, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
// import TodoForm from './Form'
// import TodoContent from './TodoContent'

const TodoContainer = ({ userIdentity, logoutUserAction }) => {
  const handleLogoutClick = () => {
    logoutUserAction()
  }

  return (
    <SafeAreaView>
      <View className="todo">
        <View className="todo__user">
          <Text className="todo__user-name">User: {userIdentity.username}</Text>
          <TouchableOpacity onPress={handleLogoutClick}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
        {/* <TodoForm />
        <TodoContent /> */}
      </View>
    </SafeAreaView>
  )
}

export default TodoContainer
