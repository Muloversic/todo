import bcrypt from 'bcrypt'
import UserModel from '../../models/userModel'

const loginUser = async (ctx) => {
  try {
    const { name, password } = ctx.request.body
    if (!name || name.trim() === '') {
      console.log('invalid user nickname came while login')
      ctx.notFound('invalid user nickname')
      return
    }

    if (!password || password.length < 4 || password.length > 13) {
      console.log('invalid user password came while login')
      ctx.notFound('invalid user password')
      return
    }

    const user = await UserModel.findOne({ nickname: name })
    if (!user) {
      console.log('User not found')
      ctx.notFound('User not found')
      return
    }

    const isValidPassword = bcrypt.compareSync(password, user.password)
    if (!isValidPassword) {
      console.log('Password is not valid')
      ctx.notFound('Password is not valid')
      return
    }
    // const user = new UserModel({ nickname: name, password: hashPasword })
    // await user.save()
    ctx.resolve('user was created')
  } catch (err) {
    console.log('create user:', err.message)
    ctx.notFound(err.message)
  }
}

export default loginUser
