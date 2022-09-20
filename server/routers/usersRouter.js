import Router from 'koa-router'
import registerUser from '../controllers/Users/registration'
import loginUser from '../controllers/Users/login'
import refreshUserToken from '../controllers/Users/refreshUserToken'

export default function configureRoutes() {
  const router = Router()

  router.post('/registration', registerUser)
  router.post('/login', loginUser)
  router.get('/refresh', refreshUserToken)

  return [router.routes(), router.allowedMethods()]
}
