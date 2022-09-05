import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTodosRequest } from './actions/todos'
import TodoForm from './components/Form'
import TodosContainer from './components/TodosContainer'
import TodoFilters from './components/TodoFilters'

class App extends Component {
  componentDidMount() {
    const { loadTodosAction } = this.props
    loadTodosAction()
  }

  render() {
    const { todos } = this.props
    return (
      <div className="todo">
        <TodoForm />
        <TodoFilters todos={todos} />
        <TodosContainer todos={todos} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ todos: state.todo.todos })

const mapDispatchToProps = (dispatch) => ({
  loadTodosAction: () => dispatch(loadTodosRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
