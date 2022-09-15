import UserModel from '../../models/userModel'
import { generateTokens } from '../../helpers'

const logoutUser = async (ctx) => {
  try {
    const { refreshToken } = ctx.request.body
    // delete token
    ctx.resolve('logout')
  } catch (err) {
    console.log('logout user:', err.message)
    ctx.notFound(err.message)
  }
}

export default logoutUser
