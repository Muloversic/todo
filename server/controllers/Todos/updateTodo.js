import Todo from '../../models/todoModel'

const updateTodo = async (ctx) => {
  try {
    const { name, active } = ctx.request.body
    const payload = name ? { name } : { active }
    const id = ctx.request.url.split('/')[2]
    const gotTodo = await Todo.findById(id)
    if (!gotTodo) {
      ctx.status = 404
      ctx.body = 'todo was not found'
      return
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, payload, { new: true })
    console.log('todo was updated')
    ctx.status = 200
    ctx.body = updatedTodo
  } catch (err) {
    console.log(err.message)
    ctx.status = 404
    ctx.body = err.message
  }
}

export default updateTodo
