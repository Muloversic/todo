import { validateRefreshToken, generateTokens } from '../../helpers'
import UserModel from '../../models/userModel'

const refreshUserToken = async (ctx) => {
  try {
    const refreshToken = ctx.query[0]
    if (!refreshToken) {
      console.log('No token came')
      ctx.notFound('No token came')
      return
    }

    const userData = validateRefreshToken(refreshToken)
    if (!userData) {
      console.log('No authorized user')
      ctx.permissionDenied('No authorized user 401')
      return
    }

    const user = await UserModel.findById(userData._id)
    const { username: nickname, _id } = user
    const tokens = generateTokens({ nickname, _id })
    ctx.resolve({
      ...tokens,
      nickname,
      _id,
    })
  } catch (err) {
    console.log('refresh User Token err:', err.message)
    ctx.notFound(err.message)
  }
}

export default refreshUserToken
