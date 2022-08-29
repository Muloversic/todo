import Todo from '../../models/todoModel'

const postTodo = async (request, response) => {
  try {
    let body = ''
    request.on('data', (chunk) => {
      body += chunk.toString()
    })

    request.on('end', async () => {
      const { name, active } = JSON.parse(body)
      if (!(name && name.trim()) || typeof active !== 'boolean') {
        response.writeHead(404)
        response.end(JSON.stringify('invalid data'))
        return
      }

      const newTodo = await Todo.create({ name, active })
      console.log('New todo was created')
      response.writeHead(201)
      return response.end(JSON.stringify(newTodo))
    })
  } catch (err) {
    console.log(err.message)
    return response.end(404, JSON.stringify(err.message))
  }
}

export default postTodo
