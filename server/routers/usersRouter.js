import Router from 'koa-router'
import registerUser from '../controllers/Users/registration'
import loginUser from '../controllers/Users/login'
import logoutUser from '../controllers/Users/logout'

export default function configureRoutes() {
  const router = Router()

  router.post('/registration', registerUser)
  router.post('/login', loginUser)
  router.post('/logout', logoutUser)

  return [router.routes(), router.allowedMethods()]
}
