import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import TodoApp from './components/TodoApp'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="todos" element={<TodoApp />} />
    </Routes>
  </BrowserRouter>
)

export default App
