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

router.post('/todos', async (ctx) => {
  await postTodo(ctx)
})

router.patch('/todos/:id', async (ctx) => {
  await updateTodo(ctx)
})

router.delete('/todos/:id', async (ctx) => {
  await deleteTodo(ctx)
})

router.delete('/todos', async (ctx) => {
  await deleteAllTodo(ctx)
})

export default router
