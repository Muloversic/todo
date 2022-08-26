import todoModel from '../../models/todoModel'

const deleteAllTodo = async (request, response) => {
  try {
    const todos = await todoModel.deleteMany()
    return response.end(JSON.stringify(todos))
  } catch (err) {
    console.error(err)
    return response.end(404, JSON.stringify(err.message))
  }
}

export default deleteAllTodo
