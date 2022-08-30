import Router from 'koa-router'
import postTodo from './controllers/Todos/createTodo'
import deleteTodo from './controllers/Todos/deleteTodo'
import getAllTodos from './controllers/Todos/getAllTodos'
import deleteAllTodo from './controllers/Todos/deleteAllTodos'
import updateTodo from './controllers/Todos/updateTodo'

export default function configureRoutes() {
  const router = Router()

  router.get('/', getAllTodos)
  router.post('/', postTodo)
  router.patch('/:id', updateTodo)
  router.delete('/:id', deleteTodo)
  router.delete('/', deleteAllTodo)

  return [router.routes(), router.allowedMethods()]
}
