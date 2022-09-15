import bcrypt from 'bcrypt'
import { generateTokens } from '../../helpers'
import UserModel from '../../models/userModel'

const registerUser = async (ctx) => {
  try {
    const { username, password } = ctx.request.body
    if (!username || username.trim() === '') {
      console.log('invalid username came while registration')
      ctx.permissionDenied('invalid username')
      return
    }

    if (!password || password.length < 4 || password.length > 13) {
      console.log('invalid user password came while registration')
      ctx.permissionDenied('invalid user password')
      return
    }

    const candidate = await UserModel.findOne({ username })
    if (candidate) {
      console.log('User already exists')
      ctx.permissionDenied('User already exists')
      return
    }

    const hashPasword = bcrypt.hashSync(password, 7)
    const user = await UserModel.create({ username, password: hashPasword })
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

export default registerUser
