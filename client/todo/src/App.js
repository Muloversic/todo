import React, { useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import TodoApp from './components/TodoApp'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { checkAuth } from './store/actions/user'

const App = () => {
  const dispatch = useDispatch()
  const checkAuthAction = (payload) => dispatch(checkAuth(payload))
  useEffect(() => {
    const { token, refreshToken } = JSON.parse(localStorage.getItem('userStore'))
    if (token) {
      //   checkAuthAction(refreshToken)
    }
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="todos" element={<TodoApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
