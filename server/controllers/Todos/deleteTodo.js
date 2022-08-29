import Todo from '../../models/todoModel'

const deleteTodo = async (request, response, id) => {
  try {
    const gotTodo = await Todo.findById(id)
    if (!gotTodo) {
      response.writeHead(404)
      response.end(JSON.stringify('todo was not found'))
      return
    }

    const todo = await Todo.findByIdAndDelete(id)
    console.log('todo was deleted')
    response.writeHead(200)
    return response.end(JSON.stringify(todo))
  } catch (err) {
    console.log(err.message)
    return response.end(404, JSON.stringify(err.message))
  }
}

export default deleteTodo
