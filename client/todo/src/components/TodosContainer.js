import React, { Component } from 'react'
import Todo from './Todo.js'

class TodosContainer extends Component {
  constructor() {
    super()
    this.state = {
      todoId: null,
    }
  }

  handleCurrentTodo = (id) => {
    this.setState({ todoId: id })
  }

  render() {
    const { todos } = this.props
    const { todoId } = this.state
    return (
      <div className="todo__items-container">
        {todos.map((todo) => (
          <Todo
            todo={todo}
            key={todo._id}
            handleCurrentTodo={this.handleCurrentTodo}
            todoId={todoId}
          />
        ))}
      </div>
    )
  }
}

export default TodosContainer
