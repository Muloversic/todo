import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import TodoApp from './components/TodoApp'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { checkAuthRequest } from './store/actions/user'

const App = ({ authenticated, checkAuthAction }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const userStore = JSON.parse(localStorage.getItem('userStore'))
    if (userStore) {
      checkAuthAction(userStore.refreshToken)
    }

    if (authenticated) {
      navigate('/todos')
    }
  }, [authenticated])

  return (
    <Routes>
      <Route index element={<Register />} />
      <Route path="login" element={authenticated ? <Navigate to="/todos" /> : <Login />} />
      <Route path="todos" element={authenticated ? <TodoApp /> : <Navigate to="/" />} />
    </Routes>
  )
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
})

const mapDispatchToProps = (dispatch) => ({
  checkAuthAction: (payload) => dispatch(checkAuthRequest(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
