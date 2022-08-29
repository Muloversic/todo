import url from 'url'
import Todo from '../../models/todoModel'

const getAllTodos = async (request, response) => {
  try {
    const queryObj = url.parse(request.url, true).query
    let filter = {}
    if (queryObj.active) {
      filter = { active: JSON.parse(queryObj.active) }
    }

    const todos = await Todo.find(filter)
    console.log('all todos were got')
    response.writeHead(200)
    return response.end(JSON.stringify(todos))
  } catch (err) {
    console.log(err.message)
    return response.end(404, JSON.stringify(err.message))
  }
}

export default getAllTodos
