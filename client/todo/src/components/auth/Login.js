import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTheme, Box, Container, TextField, Button } from '@mui/material'
import { loginUserRequest, clearUserError } from '../../store/actions/user'

const Login = ({ loginUserAction, loginUserErr, clearUserErrorAction }) => {
  const defaultUserState = {
    username: '',
    pass: '',
  }

  const theme = useTheme()
  const navigate = useNavigate()
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
        navigate,
      }

      loginUserAction(payload)
      setErrorMessage({
        nameErr: '',
        passErr: '',
      })
    },
    [userData],
  )

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
            error={!!errorMessage.nameErr || !!loginUserErr}
            helperText={errorMessage.nameErr || loginUserErr}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            required
            name="pass"
            value={userData.pass}
            error={!!errorMessage.passErr || !!loginUserErr}
            helperText={errorMessage.passErr || loginUserErr}
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
  clearUserErrorAction: () => dispatch(clearUserError()),
})

const mapStateToProps = (state) => ({
  isUserAuthenticated: state.user.authenticated,
  loginUserErr: state.userError,
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
