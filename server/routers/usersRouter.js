import Router from 'koa-router'
import registerUser from '../controllers/Users/registration'

export default function configureRoutes() {
  const router = Router()

  router.post('/registration', registerUser)

  return [router.routes(), router.allowedMethods()]
}
