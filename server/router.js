import postTodo from './controllers/Todos/createTodo'
import deleteTodo from './controllers/Todos/deleteTodo'
import getAllTodos from './controllers/Todos/getAllTodos'
import deleteAllTodo from './controllers/Todos/deleteAllTodos'
import updateTodo from './controllers/Todos/updateTodo'

const router = async (request, response) => {
  const todoIdMatch = request.url.match(/\/todos\/([0-9]+)/)
  if (request.method === 'OPTIONS') {
    response.writeHead(200)
    response.end()
    return
  }

  if (request.method === 'POST' && request.url === '/todos') {
    await postTodo(request, response)
    return
  }

  if (request.method === 'GET' && request.url === '/todos') {
    await getAllTodos(request, response)
    return
  }

  if (request.method === 'DELETE' && todoIdMatch) {
    const id = request.url.split('/')[2]
    await deleteTodo(request, response, id)
    return
  }

  if (request.method === 'DELETE' && request.url === '/todos') {
    await deleteAllTodo(request, response)
    return
  }

  if (request.method === 'PATCH' && request.url === '/todos') {
    await updateTodo(request, response)
    return
  }

  response.writeHead(404, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify({ message: 'not found' }))
}
export default router
