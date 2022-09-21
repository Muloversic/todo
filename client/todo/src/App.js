import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import TodoApp from './components/todos/TodoApp'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { setNavigate } from './store/actions/user'

const App = ({ authenticated, setNavigateUserAction }) => {
  const navigate = useNavigate()
  useEffect(() => {
    // if (authenticated) {
    //   navigate('/todos')
    // }
    setNavigateUserAction(navigate)
  }, [])

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
  setNavigateUserAction: (payload) => dispatch(setNavigate(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
