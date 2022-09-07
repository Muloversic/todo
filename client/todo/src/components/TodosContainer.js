import React, { Component } from 'react'
import Todo from './Todo.js'

class TodosContainer extends Component {
  constructor() {
    super()
    this.state = {
      todoId: '',
    }
  }

  handleCurrentTodo = (id) => {
    this.setState({ todoId: id })
  }

  render() {
    const { todos } = this.props
    const { todoId } = this.state
    const isEditing = true
    console.log(todos)
    const todoElements = todos.map((todo) => {
      if (todo._id === todoId) {
        return (
          <Todo
            todo={todo}
            key={todo._id}
            handleCurrentTodo={this.handleCurrentTodo}
            todoId={todoId}
            isEditing={isEditing}
          />
        )
      }

      return (
        <Todo
          todo={todo}
          key={todo._id}
          handleCurrentTodo={this.handleCurrentTodo}
          todoId={todoId}
        />
      )
    })
    return <div className="todo__items-container">{todoElements}</div>
  }
}

export default TodosContainer
