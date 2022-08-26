import Todo from '../../models/todoModel'

const postTodo = async (request, response) => {
  try {
    let body = ''
    request.on('data', (chunk) => {
      body += chunk.toString()
    })

    request.on('end', async () => {
      const { name, active } = JSON.parse(body)
      const newTodo = await Todo.create({ name, active })
      response.writeHead(201)
      return response.end(JSON.stringify(newTodo))
    })
  } catch (err) {
    console.log(err)
    return response.end(404, JSON.stringify(err.message))
  }
}

export default postTodo
