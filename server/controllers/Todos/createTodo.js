import Todo from '../../models/todoModel'

const postTodo = async (ctx) => {
  try {
    const { name, active } = ctx.request.body
    if (!(name && name.trim()) || typeof active !== 'boolean') {
      console.log('invalid data came while creating new todo')
      ctx.status = 404
      ctx.body = 'invalid data'
      return
    }

    const newTodo = await Todo.create({ name, active })
    console.log('New todo was created')
    ctx.status = 201
    ctx.body = newTodo
  } catch (err) {
    console.log('post todo error:', err.message)
    ctx.status = 404
    ctx.body = err.message
  }
}

export default postTodo
