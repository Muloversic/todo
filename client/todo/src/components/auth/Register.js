import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme, Box, Container, TextField, Button } from '@mui/material'

const Register = ({ createUserAction, registerUserErr, clearUserErrorAction }) => {
  const defaultUserState = {
    username: '',
    pass: '',
    repeatPass: '',
  }

  const theme = useTheme()
  const [userData, setUserData] = useState(defaultUserState)
  const [errorMessage, setErrorMessage] = useState(defaultUserState)

  const handleFormChange = useCallback(({ target }) => {
    const { name, value } = target
    clearUserErrorAction()
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
    },
    [userData],
  )

  useEffect(() => () => clearUserErrorAction(), [])
  return (
    <Container fixed>
      <Box sx={{ bgcolor: theme.palette.register.main, height: '100vh' }}>
        <form className="register-form" onChange={handleFormChange} onSubmit={handleFromSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            required
            name="username"
            value={userData.username}
            error={!!errorMessage.nameErr || !!registerUserErr}
            helperText={errorMessage.nameErr || registerUserErr}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            required
            name="pass"
            value={userData.pass}
            error={!!errorMessage.passErr}
            helperText={errorMessage.passErr}
          />
          <TextField
            label="Repeat password"
            variant="outlined"
            margin="normal"
            type="password"
            required
            name="repeatPass"
            value={userData.repeatPass}
            error={!!errorMessage.passErr}
            helperText={errorMessage.passErr}
          />
          <Button variant="submit" type="submit">
            Create an account
          </Button>
          <Link to="/login" className="auth-link">
            Already have an account?
          </Link>
        </form>
      </Box>
    </Container>
  )
}

export default Register
