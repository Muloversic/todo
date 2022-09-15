import Router from 'koa-router'
import registerUser from '../controllers/Users/registration'
import loginUser from '../controllers/Users/login'

export default function configureRoutes() {
  const router = Router()

  router.post('/registration', registerUser)
  router.post('/login', loginUser)

  return [router.routes(), router.allowedMethods()]
}
