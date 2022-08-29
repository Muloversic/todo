import Todo from '../../models/todoModel'

const deleteAllTodo = async (request, response) => {
  try {
    const todos = await Todo.deleteMany()
    console.log('all todos were deleted')
    return response.end(200, JSON.stringify(todos))
  } catch (err) {
    console.error(err.message)
    return response.end(404, JSON.stringify(err.message))
  }
}

export default deleteAllTodo
