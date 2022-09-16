import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTheme, Box, Container, TextField, Button } from '@mui/material'
import { loginUserRequest } from '../../store/actions/user'

const Login = ({ loginUserAction, userIdentity, loginUserErr }) => {
  const theme = useTheme()
  const [userData, setUserData] = useState({
    username: '',
    pass: '',
  })
  const [errorMessage, setErrorMessage] = useState({
    nameErr: '',
    passErr: '',
    serverErr: '',
  })

  const handleFormChange = useCallback(({ target }) => {
    setErrorMessage(``)
    if (target.name === 'username') {
      setErrorMessage((prevState) => ({
        ...prevState,
        nameErr: '',
      }))

      setUserData((prevState) => ({
        ...prevState,
        username: target.value,
      }))
    }

    if (target.name === 'pass') {
      setErrorMessage((prevState) => ({
        ...prevState,
        passErr: '',
      }))

      setUserData((prevState) => ({
        ...prevState,
        pass: target.value,
      }))
    }
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

      //   setUserData({
      //     username: '',
      //     pass: '',
      //   })

      //   setErrorMessage({
      //     nameErr: '',
      //     passErr: '',
      //     serverErr: '',
      //   })
    },
    [userData.username, userData.pass],
  )

  useEffect(() => {
    if (loginUserErr.username) {
      setErrorMessage((prevState) => ({
        ...prevState,
        nameErr: loginUserErr.username,
      }))
    }

    if (loginUserErr.password) {
      setErrorMessage((prevState) => ({
        ...prevState,
        passErr: loginUserErr.password,
      }))
    }
  }, [loginUserErr])

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
            error={!!errorMessage.nameErr}
            helperText={errorMessage.nameErr}
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
          <Button variant="submit" type="submit">
            Login
          </Button>
          <Link to="/" className="auth-link">{`Don't have an account?`}</Link>
        </form>
      </Box>
    </Container>
  )
}

const mapDispatchToProps = (dispatch) => ({
  loginUserAction: (payload) => dispatch(loginUserRequest(payload)),
})

const mapStateToProps = (state) => ({
  userIdentity: state.user.indentity,
  loginUserErr: state.user.errorMessage,
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
