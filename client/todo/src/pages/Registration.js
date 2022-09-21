import React from 'react'
import { connect } from 'react-redux'
import Register from '../components/auth/Register'
import { createUserRequest, clearUserError } from '../store/actions/user'

const RegistrationPage = ({ createUserAction, registerUserErr, clearUserErrorAction }) => (
  <Register
    createUserAction={createUserAction}
    registerUserErr={registerUserErr}
    clearUserErrorAction={clearUserErrorAction}
  />
)

const mapDispatchToProps = (dispatch) => ({
  createUserAction: (payload) => dispatch(createUserRequest(payload)),
  clearUserErrorAction: () => dispatch(clearUserError()),
})

const mapStateToProps = (state) => ({
  isUserAuthenticated: state.user.authenticated,
  registerUserErr: state.userError,
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage)
