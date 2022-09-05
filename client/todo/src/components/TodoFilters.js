import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateFilterRequest, deleteAllTodosRequest } from '../actions/todos'

class TodoFilters extends Component {
  processFilterButtons = (filterButton) => {
    const todoFilterButtons = document.querySelector('.todo__filters-row--controls')
    ;[...todoFilterButtons.children].forEach((button) =>
      button.classList.remove('todo__filtres-button--active'),
    )
    filterButton.classList.add('todo__filtres-button--active')
  }

  showAllTodos = (e) => {
    e.preventDefault()
    const filterButton = e.target
    this.processFilterButtons(filterButton)
    const { updateFiltersAction } = this.props
    updateFiltersAction('all')
  }

  showActiveTodos = (e) => {
    e.preventDefault()
    const filterButton = e.target
    this.processFilterButtons(filterButton)
    const { updateFiltersAction } = this.props
    updateFiltersAction('active')
  }

  showDoneTodos = (e) => {
    e.preventDefault()
    const filterButton = e.target
    this.processFilterButtons(filterButton)
    const { updateFiltersAction } = this.props
    updateFiltersAction('done')
  }

  deleteAllTodos = () => {
    const { deleteAllTodosAction } = this.props
    deleteAllTodosAction()
  }

  render() {
    const { todos } = this.props
    return (
      <div className="todo__filters">
        <div className="todo__filters-row todo__filters-row--controls">
          <button
            type="button"
            className="todo__filtres-button todo__filtres-button--active"
            data-sort="all"
            onClick={this.showAllTodos}
          >
            All todos
          </button>
          <button
            type="button"
            className="todo__filtres-button"
            data-sort="active"
            onClick={this.showActiveTodos}
          >
            Active todos
          </button>
          <button
            type="button"
            className="todo__filtres-button"
            data-sort="done"
            onClick={this.showDoneTodos}
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

const mapDispatchToProps = (dispatch) => ({
  updateFiltersAction: (payload) => dispatch(updateFilterRequest(payload)),
  deleteAllTodosAction: () => dispatch(deleteAllTodosRequest()),
})

export default connect(null, mapDispatchToProps)(TodoFilters)
