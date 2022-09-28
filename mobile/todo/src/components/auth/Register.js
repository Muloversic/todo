import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-native'
import { View, Text, TouchableOpacity } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Input } from '@rneui/themed'
import authStyles from '../../styles/auth'

const Register = ({ createUserAction, registerUserErr, clearUserErrorAction }) => {
  const defaultUserState = {
    username: '',
    pass: '',
    repeatPass: '',
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
    console.log(userData)
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

    if (userData.pass !== userData.repeatPass) {
      setErrorMessage((prevState) => ({
        ...prevState,
        passErr: `Passwords should match`,
      }))

      return
    }

    const payload = {
      username: userData.username,
      password: userData.pass,
    }

    createUserAction(payload)
    setErrorMessage({
      nameErr: '',
      passErr: '',
      repeatPassErr: '',
    })
  }, [userData])

  useEffect(() => () => clearUserErrorAction(), [])
  return (
    <SafeAreaView>
      <View style={authStyles.wrapper}>
        <Text style={authStyles.title}>Registration</Text>
        <Input
          label="Username"
          value={userData.username}
          errorStyle={authStyles.inputError}
          labelStyle={{ color: 'black' }}
          inputContainerStyle={{
            borderBottomColor: errorMessage.nameErr
              ? authStyles.inputError
              : authStyles.inputCommonColor,
          }}
          errorMessage={errorMessage.nameErr || registerUserErr}
          onChangeText={(text) => handleFormChange(text, 'username')}
        />
        <Input
          label="Password"
          value={userData.pass}
          errorStyle={authStyles.inputError}
          labelStyle={{ color: 'black' }}
          inputContainerStyle={{
            borderBottomColor: errorMessage.passErr
              ? authStyles.inputError
              : authStyles.inputCommonColor,
          }}
          errorMessage={errorMessage.passErr}
          onChangeText={(text) => handleFormChange(text, 'pass')}
        />
        <Input
          label="Repeat password"
          value={userData.repeatPass}
          labelStyle={{ color: 'black' }}
          inputContainerStyle={{
            borderBottomColor: errorMessage.passErr
              ? authStyles.inputError
              : authStyles.inputCommonColor,
          }}
          errorMessage={errorMessage.passErr}
          onChangeText={(text) => handleFormChange(text, 'repeatPass')}
        />
        <TouchableOpacity onPress={handleFromSubmit} style={authStyles.submitButton}>
          <Text style={authStyles.submitButtonText}>Create an account</Text>
        </TouchableOpacity>
        <Link to="/login" className="auth-link">
          <Text>Already have an account?</Text>
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default Register
