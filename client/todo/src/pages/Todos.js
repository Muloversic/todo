import React from 'react'
import { connect } from 'react-redux'
import { logoutUserRequest } from '../store/actions/user'
import TodoApp from '../components/todos/TodoApp'

const TodosPage = ({ userIdentity, logoutUserAction }) => (
  <TodoApp userIdentity={userIdentity} logoutUserAction={logoutUserAction} />
)

const mapDispatchToProps = (dispatch) => ({
  logoutUserAction: (payload) => dispatch(logoutUserRequest(payload)),
})

const mapStateToProps = (state) => ({
  userIdentity: state.user.indentity,
})

export default connect(mapStateToProps, mapDispatchToProps)(TodosPage)
