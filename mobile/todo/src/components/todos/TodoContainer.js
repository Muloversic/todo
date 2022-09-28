import React from 'react'
import { Button } from '@mui/material'
import TodoForm from './Form'
import TodoContent from './TodoContent'

const TodoContainer = ({ userIdentity, logoutUserAction }) => {
  const handleLogoutClick = (e) => {
    e.preventDefault()
    logoutUserAction()
  }

  return (
    <div className="todo">
      <div className="todo__user">
        <p className="todo__user-name">User: {userIdentity.username}</p>
        <Button onClick={handleLogoutClick} variant="submit" sx={{ m: 0 }}>
          Logout
        </Button>
      </div>
      <TodoForm />
      <TodoContent />
    </div>
  )
}

export default TodoContainer
