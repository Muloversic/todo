import bcrypt from 'bcrypt'
import UserModel from '../../models/userModel'
import { generateTokens } from '../../helpers'

const loginUser = async (ctx) => {
  try {
    const { username, password } = ctx.request.body
    if (!username || username.trim() === '') {
      console.log('invalid username or password came while login')
      ctx.permissionDenied('invalid username or password')
      return
    }

    if (!password || password.length < 4 || password.length > 13) {
      console.log('invalid username or password came while login')
      ctx.permissionDenied('invalid username or password')
      return
    }

    const user = await UserModel.findOne({ username })
    if (!user) {
      console.log('User not found')
      ctx.notFound('User not found')
      return
    }

    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (!isValidPassword) {
      console.log('invalid username or password')
      ctx.permissionDenied('invalid username or password')
      return
    }

    const { username: nickname, _id } = user
    const tokens = generateTokens({ nickname, _id })
    ctx.resolve({
      ...tokens,
      nickname,
      _id,
    })
  } catch (err) {
    console.log('create user:', err.message)
    ctx.notFound(err.message)
  }
}

export default loginUser
