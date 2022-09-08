import React, { Component } from 'react'
import Todo from './Todo.js'

class TodosContainer extends Component {
  constructor() {
    super()
    this.state = {
      editingTodoId: null,
    }
  }

  handleCurrentTodo = (id) => {
    this.setState({ editingTodoId: id })
  }

  render() {
    const { todos } = this.props
    const { editingTodoId } = this.state
    return (
      <div className="todo__items-container">
        {todos.map((todo) => (
          <Todo
            todo={todo}
            key={todo._id}
            handleCurrentTodo={this.handleCurrentTodo}
            editingTodoId={editingTodoId}
          />
        ))}
      </div>
    )
  }
}

export default TodosContainer
