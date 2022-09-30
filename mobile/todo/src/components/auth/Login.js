import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-native'
import { View, TouchableOpacity, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Input } from '@rneui/themed'
import { authStyles } from '../../styles/style'

const Login = ({ loginUserAction, loginUserErr, clearUserErrorAction }) => {
  const navigate = useNavigate()
  const defaultUserState = {
    username: '',
    pass: '',
  }

  const [userData, setUserData] = useState(defaultUserState)
  const [errorMessage, setErrorMessage] = useState(defaultUserState)

  const handleFormChange = useCallback((text, name) => {
    clearUserErrorAction()
    setErrorMessage(defaultUserState)
    setUserData((prevState) => ({
      ...prevState,
      [name]: text,
    }))
  }, [])

  const handleFromSubmit = useCallback(() => {
    if (userData.username.trim() === '') {
      setErrorMessage((prevState) => ({
        ...prevState,
        nameErr: `Username field can't be empty`,
      }))

      return
    }

    if (userData.pass.length < 4 || userData.pass.length > 13) {
      setErrorMessage((prevState) => ({
        ...prevState,
        passErr: `Password should not be less than 4 symbols and not more than 13 symbols`,
      }))

      return
    }

    const payload = {
      username: userData.username,
      password: userData.pass,
    }

    loginUserAction(payload)
    setErrorMessage({
      nameErr: '',
      passErr: '',
    })
  }, [userData])

  useEffect(() => () => clearUserErrorAction(), [])

  return (
    <SafeAreaView>
      <View style={authStyles.wrapper}>
        <Text style={authStyles.title}>Login</Text>
        <Input
          label="Username"
          value={userData.username}
          labelStyle={{ color: 'black' }}
          inputContainerStyle={{
            borderBottomColor: errorMessage.nameErr
              ? authStyles.inputError
              : authStyles.inputCommonColor,
          }}
          errorMessage={errorMessage.nameErr || loginUserErr}
          onChangeText={(text) => handleFormChange(text, 'username')}
        />
        <Input
          label="Password"
          labelStyle={{ color: 'black' }}
          inputContainerStyle={{
            borderBottomColor: errorMessage.passErr
              ? authStyles.inputError
              : authStyles.inputCommonColor,
          }}
          errorMessage={errorMessage.passErr || loginUserErr}
          value={userData.pass}
          onChangeText={(text) => handleFormChange(text, 'pass')}
        />
        <TouchableOpacity onPress={handleFromSubmit} style={authStyles.submitButton}>
          <Text style={authStyles.submitButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('/')}>
          <Text>{`Don't have an account?`}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Login
