import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import TodoApp from './components/TodoApp'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { checkAuthRequest } from './store/actions/user'

const App = ({ authenticated, checkAuthAction }) => {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const userStore = JSON.parse(localStorage.getItem('userStore'))
    if (userStore) {
      checkAuthAction(userStore.refreshToken)
    }
  }, [])

  useEffect(() => {
    setIsLogged(authenticated)
  }, [authenticated])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Register />} />
        <Route path="login" element={isLogged ? <Navigate to="/todos" /> : <Login />} />
        <Route path="todos" element={isLogged ? <TodoApp /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
})

const mapDispatchToProps = (dispatch) => ({
  checkAuthAction: (payload) => dispatch(checkAuthRequest(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
