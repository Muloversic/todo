import todoModel from '../../models/todoModel'

const getAllTodos = async (request, response) => {
  try {
    const todos = await todoModel.find()
    response.writeHead(201)
    return response.end(JSON.stringify(todos))
  } catch (err) {
    console.log(err)
    return response.end(404, JSON.stringify(err.message))
  }
}

export default getAllTodos
