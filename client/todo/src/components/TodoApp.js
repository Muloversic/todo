import React from 'react'
import { Button } from '@mui/material'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router'
import TodoForm from './Form'
import TodoContent from './TodoContent'
import { logoutUserRequest } from '../store/actions/user'

const TodoApp = ({ userIdentity, logoutUserAction }) => {
  console.log(userIdentity)
  const navigate = useNavigate()
  const handleLogoutClick = (e) => {
    e.preventDefault()
    const userStore = JSON.parse(localStorage.getItem('userStore'))
    const { refreshToke } = userStore
    logoutUserAction(refreshToke)
    navigate('/login')
  }

  return (
    <div className="todo">
      <div>
        <p>User: {userIdentity.username}</p>
        <Button onClick={handleLogoutClick}>Logout</Button>
      </div>
      <TodoForm />
      <TodoContent />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  logoutUserAction: (payload) => dispatch(logoutUserRequest(payload)),
})

const mapStateToProps = (state) => ({
  userIdentity: state.user.indentity,
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
