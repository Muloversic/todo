import React from 'react'
import { connect } from 'react-redux'
import Login from '../components/auth/Login'
import { loginUserRequest, clearUserError } from '../store/actions/user'

const LoginPage = ({ loginUserAction, loginUserErr, clearUserErrorAction }) => (
  <Login
    loginUserAction={loginUserAction}
    loginUserErr={loginUserErr}
    clearUserErrorAction={clearUserErrorAction}
  />
)

const mapDispatchToProps = (dispatch) => ({
  loginUserAction: (payload) => dispatch(loginUserRequest(payload)),
  clearUserErrorAction: () => dispatch(clearUserError()),
})

const mapStateToProps = (state) => ({
  loginUserErr: state.userError,
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
