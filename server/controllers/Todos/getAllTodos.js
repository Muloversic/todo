import Todo from '../../models/todoModel'

const getAllTodos = async (request, response) => {
  try {
    const todos = await Todo.find()
    console.log('all todos were got')
    response.writeHead(200)
    return response.end(JSON.stringify(todos))
  } catch (err) {
    console.log(err.message)
    return response.end(404, JSON.stringify(err.message))
  }
}

export default getAllTodos
