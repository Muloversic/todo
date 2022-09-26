import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import Todos from './pages/Todos'
import Login from './pages/Login'
import Registration from './pages/Registration'
import { setNavigate } from './store/actions/user'

const App = ({ authenticated, setNavigateUserAction }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (authenticated) {
      navigate('/todos')
    }

    setNavigateUserAction(navigate)
  }, [authenticated])

  return (
    <Routes>
      <Route index element={<Registration />} />
      <Route path="login" element={authenticated ? <Navigate to="/todos" /> : <Login />} />
      <Route path="todos" element={authenticated ? <Todos /> : <Navigate to="/" />} />
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
