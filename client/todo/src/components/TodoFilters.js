import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateFilterRequest, deleteAllTodosRequest } from '../store/actions/todos.js'

class TodoFilters extends Component {
  handleClick = (filter) => () => {
    const { updateFiltersAction } = this.props
    updateFiltersAction(filter)
  }

  deleteAllTodos = () => {
    const { deleteAllTodosAction } = this.props
    deleteAllTodosAction()
  }

  render() {
    const { todos, filterType } = this.props
    return (
      <div className="todo__filters">
        <div className="todo__filters-row todo__filters-row--controls">
          <button
            type="button"
            className={`todo__filtres-button ${
              filterType === 'all' ? 'todo__filtres-button--active' : ''
            }`}
            onClick={this.handleClick('all')}
          >
            All todos
          </button>
          <button
            type="button"
            className={`todo__filtres-button ${
              filterType === 'active' ? 'todo__filtres-button--active' : ''
            }`}
            onClick={this.handleClick('active')}
          >
            Active todos
          </button>
          <button
            type="button"
            className={`todo__filtres-button ${
              filterType === 'done' ? 'todo__filtres-button--active' : ''
            }`}
            onClick={this.handleClick('done')}
          >
            Done todos
          </button>
        </div>
        <div className="todo__filters-row">
          <p className="todo__item-counter">Todos counter: {todos.length}</p>
          {todos.length ? (
            <button type="submit" className="todo__remove-all" onClick={this.deleteAllTodos}>
              Remove all
            </button>
          ) : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ filterType: state.filter })

const mapDispatchToProps = (dispatch) => ({
  updateFiltersAction: (payload) => dispatch(updateFilterRequest(payload)),
  deleteAllTodosAction: () => dispatch(deleteAllTodosRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoFilters)
