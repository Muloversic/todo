import todoModel from '../../models/todoModel'

const updateTodo = async (request, response) => {
  try {
    let body = ''
    request.on('data', (chunk) => {
      body += chunk.toString()
    })

    request.on('end', async () => {
      const { name, active } = JSON.parse(body)
      const id = request.url.split('/')[2]
      const updatedTodo = await todoModel.findByIdAndUpdate(id, { name, active }, { new: true })
      response.writeHead(200)
      return response.end(JSON.stringify(updatedTodo))
    })
  } catch (err) {
    console.log(err)
    return response.end(404, JSON.stringify(err.message))
  }
}

export default updateTodo
