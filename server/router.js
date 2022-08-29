import Router from 'koa-router'
import postTodo from './controllers/Todos/createTodo'
import deleteTodo from './controllers/Todos/deleteTodo'
import getAllTodos from './controllers/Todos/getAllTodos'
import deleteAllTodo from './controllers/Todos/deleteAllTodos'
import updateTodo from './controllers/Todos/updateTodo'

const router = new Router()
router.get('/todos', async (ctx) => {
  await getAllTodos(ctx)
})
// const router = async (request, response) => {
//   const todoIdMatch = request.url.match(/\/todos\/([0-9]+)/)
//   const queryMatch = request.url.match(/todos(\?.*)?/gm)
//   if (request.method === 'OPTIONS') {
//     response.writeHead(200)
//     response.end()
//     return
//   }

//   if (request.method === 'POST' && request.url === '/todos') {
//     await postTodo(request, response)
//     return
//   }

//   if (request.method === 'GET' && queryMatch) {
//     await getAllTodos(request, response)
//     return
//   }

//   if (request.method === 'DELETE' && todoIdMatch) {
//     const id = request.url.split('/')[2]
//     await deleteTodo(request, response, id)
//     return
//   }

//   if (request.method === 'DELETE' && request.url === '/todos') {
//     await deleteAllTodo(request, response)
//     return
//   }

//   if (request.method === 'PATCH' && todoIdMatch) {
//     await updateTodo(request, response)
//     return
//   }

//   response.writeHead(404, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify({ message: 'not found' }))
// }
export default router
