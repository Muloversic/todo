import React from 'react'
import { connect } from 'react-redux'
import { logoutUserRequest } from '../store/actions/user'
import TodoContainer from '../components/todos/TodoContainer'

const TodosPage = ({ userIdentity, logoutUserAction }) => (
  <TodoContainer userIdentity={userIdentity} logoutUserAction={logoutUserAction} />
)

const mapDispatchToProps = (dispatch) => ({
  logoutUserAction: (payload) => dispatch(logoutUserRequest(payload)),
})

const mapStateToProps = (state) => ({
  userIdentity: state.user.indentity,
})

export default connect(mapStateToProps, mapDispatchToProps)(TodosPage)
