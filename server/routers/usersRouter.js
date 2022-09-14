import Router from 'koa-router'
import createUser from '../controllers/Users/create'

export default function configureRoutes() {
  const router = Router()

  router.post('/registration', createUser)

  return [router.routes(), router.allowedMethods()]
}
