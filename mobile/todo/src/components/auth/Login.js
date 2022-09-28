import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-native'
import { View, TouchableHighlight, Animated, Text } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { Input, Button } from '@rneui/themed'

const Login = ({ loginUserAction, loginUserErr, clearUserErrorAction }) => {
  const defaultUserState = {
    username: '',
    pass: '',
  }

  const [userData, setUserData] = useState(defaultUserState)
  const [errorMessage, setErrorMessage] = useState(defaultUserState)

  const handleFormChange = useCallback(({ target }) => {
    clearUserErrorAction()
    const { name, value } = target
    setErrorMessage(defaultUserState)
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }, [])

  const handleFromSubmit = useCallback(
    (e) => {
      e.preventDefault()
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
    },
    [userData],
  )

  useEffect(() => () => clearUserErrorAction(), [])

  return (
    <SafeAreaView>
      <View>
        <Input
          label="Username"
          variant="outlined"
          required
          name="username"
          value={userData.username}
          error={!!errorMessage.nameErr || !!loginUserErr}
          helperText={errorMessage.nameErr || loginUserErr}
          onChange={handleFormChange}
        />
        <Input
          label="Password"
          variant="outlined"
          type="password"
          required
          name="pass"
          value={userData.pass}
          error={!!errorMessage.passErr || !!loginUserErr}
          helperText={errorMessage.passErr || loginUserErr}
          onChange={handleFormChange}
        />
        <TouchableHighlight>
          <Button variant="submit" type="submit" onClick={handleFromSubmit}>
            Login
          </Button>
        </TouchableHighlight>
        <TouchableHighlight>
          <Link to="/" className="auth-link">
            <Text>{`Don't have an account?`}</Text>
          </Link>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  )
}

export default Login
