import bcrypt from 'bcrypt'
import { generateTokens } from '../../helpers'
import UserModel from '../../models/userModel'

const registerUser = async (ctx) => {
  try {
    const { name, password } = ctx.request.body
    if (!name || name.trim() === '') {
      console.log('invalid user nickname came while registration')
      ctx.notFound('invalid user nickname')
      return
    }

    if (!password || password.length < 4 || password.length > 13) {
      console.log('invalid user password came while registration')
      ctx.notFound('invalid user password')
      return
    }

    const candidate = await UserModel.findOne({ nickname: name })
    if (candidate) {
      console.log('User already exists')
      ctx.notFound('User already exists')
      return
    }

    const hashPasword = bcrypt.hashSync(password, 7)
    const user = await UserModel.create({ nickname: name, password: hashPasword })
    const { nickname, _id } = user
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
