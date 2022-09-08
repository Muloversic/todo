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
            className={
              filterType === 'all'
                ? 'todo__filtres-button todo__filtres-button--active'
                : 'todo__filtres-button'
            }
            onClick={this.handleClick('all')}
          >
            All todos
          </button>
          <button
            type="button"
            className={
              filterType === 'active'
                ? 'todo__filtres-button todo__filtres-button--active'
                : 'todo__filtres-button'
            }
            onClick={this.handleClick('active')}
          >
            Active todos
          </button>
          <button
            type="button"
            className={
              filterType === 'done'
                ? 'todo__filtres-button todo__filtres-button--active'
                : 'todo__filtres-button'
            }
            onClick={this.handleClick('done')}
          >
            Done todos
          </button>
        </div>
        <div className="todo__filters-row">
          <p className="todo__item-counter">Todos counter: {todos.length}</p>
          <button
            type="submit"
            className={
              todos.length ? 'todo__remove-all' : 'todo__remove-all todo__remove-all--hidden'
            }
            onClick={this.deleteAllTodos}
          >
            Remove all
          </button>
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
