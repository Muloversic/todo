import http from 'http'
import mongoose from 'mongoose'
import postTodo from './controllers/Todos/createTodo'
import deleteTodo from './controllers/Todos/deleteTodo'
import getAllTodos from './controllers/Todos/getAllTodos'
import deleteAllTodo from './controllers/Todos/deleteAllTodos'
import updateTodo from './controllers/Todos/updateTodo'

const db = 'mongodb://localhost:27017/todo'
const connectDb = async () => {
  try {
    await mongoose.connect(db)
    console.log('connected to DB')
  } catch (err) {
    console.error(err)
  }
}
connectDb()

const PORT = 8080
const server = http.createServer()
server.on('request', async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Content-Type', 'application/json')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  const todoIdMatch = request.url.match(/\/todos\/([0-9]+)/)
  console.log(request.method)
  if (request.method === 'OPTIONS') {
    response.writeHead(200)
    response.end()
    return
  }

  if (request.method === 'POST' && request.url === '/todos/add') {
    await postTodo(request, response)
    response.writeHead(201)
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

  if (request.method === 'PATCH' && request.url === '/todos/update') {
    await updateTodo(request, response)
    response.writeHead(200)
    return
  }

  response.writeHead(404, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify({ message: 'not found' }))
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
