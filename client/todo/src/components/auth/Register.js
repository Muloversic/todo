import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTheme, Box, Container, TextField, Button } from '@mui/material'
import { createUserRequest } from '../../store/actions/user'

const Register = ({ createUserAction }) => {
  const theme = useTheme()
  const [userData, setUserData] = useState({
    username: '',
    pass: '',
    repeatPass: '',
  })
  const [errorMessage, setErrorMessage] = useState({
    nameErr: '',
    passErr: '',
    repeatPassErr: '',
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

    if (target.name === 'repeatPass') {
      setErrorMessage((prevState) => ({
        ...prevState,
        repeatPassErr: '',
      }))

      setUserData((prevState) => ({
        ...prevState,
        repeatPass: target.value,
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

      if (userData.pass !== userData.repeatPass) {
        setErrorMessage((prevState) => ({
          ...prevState,
          repeatPassErr: `Passwords should match`,
        }))

        return
      }

      const payload = {
        username: userData.username,
        password: userData.pass,
      }

      createUserAction(payload)

      setUserData({
        username: '',
        pass: '',
        repeatPass: '',
      })

      setErrorMessage({
        nameErr: '',
        passErr: '',
        repeatPassErr: '',
        serverErr: '',
      })
    },
    [userData.username, userData.pass, userData.repeatPass],
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
          <TextField
            label="Repeat password"
            variant="outlined"
            margin="normal"
            type="password"
            required
            name="repeatPass"
            value={userData.repeatPass}
            error={!!errorMessage.repeatPassErr}
            helperText={errorMessage.repeatPassErr}
          />
          <Button variant="submit" type="submit">
            Create an account
          </Button>
          <Link to="/login" className='auth-link'>Already have an account?</Link>
        </form>
      </Box>
    </Container>
  )
}

const mapDispatchToProps = (dispatch) => ({
  createUserAction: (payload) => dispatch(createUserRequest(payload)),
})

export default connect(null, mapDispatchToProps)(Register)
