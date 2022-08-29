import Todo from '../../models/todoModel'

const getAllTodos = async (request, response) => {
  try {
    const filterType = request.url.split('/')[2]
    let todos = []
    console.log(filterType)
    if (filterType === 'all') {
      todos = await Todo.find()
    }

    if (filterType === 'active') {
      todos = await Todo.find({ active: true })
    }

    if (filterType === 'done') {
      todos = await Todo.find({ active: false })
    }

    console.log('all todos were got')
    response.writeHead(200)
    return response.end(JSON.stringify(todos))
  } catch (err) {
    console.log(err.message)
    return response.end(404, JSON.stringify(err.message))
  }
}

export default getAllTodos
