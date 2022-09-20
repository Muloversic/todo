import Router from 'koa-router'
import postTodo from '../controllers/Todos/create'
import deleteTodo from '../controllers/Todos/delete'
import getAllTodos from '../controllers/Todos/getAll'
import deleteAllTodo from '../controllers/Todos/deleteAll'
import updateTodo from '../controllers/Todos/update'
import { authMiddleware } from '../middlewares'

export default function configureRoutes() {
  const router = Router()

  router.use(authMiddleware)
  router.get('/', getAllTodos)
  router.post('/', postTodo)
  router.patch('/:id', updateTodo)
  router.delete('/:id', deleteTodo)
  router.delete('/', deleteAllTodo)

  return [router.routes(), router.allowedMethods()]
}
