import React from 'react'
import { View, ScrollView, TouchableOpacity, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { TodoContainerStyles } from '../../styles/style'
import TodoForm from './Form'
import TodoContent from './TodoContent'

const TodoContainer = ({ userIdentity, logoutUserAction }) => {
  const handleLogoutClick = () => {
    logoutUserAction()
  }

  return (
    <SafeAreaView>
      <ScrollView style={TodoContainerStyles.wrapper}>
        <View style={TodoContainerStyles.user}>
          <Text style={TodoContainerStyles.userFonts}>User: {userIdentity.username}</Text>
          <TouchableOpacity onPress={handleLogoutClick}>
            <Text style={TodoContainerStyles.userFonts}>Logout</Text>
          </TouchableOpacity>
        </View>
        <TodoForm />
        <TodoContent />
      </ScrollView>
    </SafeAreaView>
  )
}

export default TodoContainer