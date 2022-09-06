import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTodosRequest } from '../actions/todos'
import TodosContainer from './TodosContainer'
import TodoFilters from './TodoFilters'

class TodoContent extends Component {
  componentDidMount() {
    const { loadTodosAction } = this.props
    loadTodosAction()
  }

  render() {
    const { todos } = this.props
    return (
      <>
        <TodoFilters todos={todos} />
        <TodosContainer todos={todos} />
      </>
    )
  }
}

const mapStateToProps = (state) => ({ todos: state.todo.todos })

const mapDispatchToProps = (dispatch) => ({
  loadTodosAction: () => dispatch(loadTodosRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoContent)
