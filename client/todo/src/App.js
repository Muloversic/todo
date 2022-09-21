import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import TodoApp from './components/todos/TodoApp'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

const App = ({ authenticated }) => {
  const navigate = useNavigate()

  useEffect(() => {
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

export default connect(mapStateToProps, null)(App)
