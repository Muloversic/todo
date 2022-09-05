import React, { Component } from 'react'
import Todo from './Todo.js'

class TodosContainer extends Component {
  render() {
    const { todos } = this.props
    const todoElements = todos.map((todo) => <Todo todo={todo} key={todo._id} />)
    return <div className="todo__items-container">{todoElements}</div>
  }
}

export default TodosContainer
