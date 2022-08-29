import Todo from '../../models/todoModel'

const deleteAllTodo = async (request, response) => {
  try {
    const todos = await Todo.deleteMany()
    console.log('all todos were deleted')
    response.writeHead(200)
    return response.end(JSON.stringify(todos))
  } catch (err) {
    console.error(err.message)
    return response.end(404, JSON.stringify(err.message))
  }
}

export default deleteAllTodo
