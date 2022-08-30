import Todo from '../../models/todoModel'

const updateTodo = async (ctx) => {
  try {
    const { name, active } = ctx.request.body
    const payload = name ? { name } : { active }
    const { id } = ctx.request.params
    const gotTodo = await Todo.findById(id)
    if (!gotTodo) {
      console.log('todo was not found by id while updating')
      ctx.status = 404
      ctx.body = 'todo was not found'
      return
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, payload, { new: true })
    console.log('todo was updated')
    ctx.status = 200
    ctx.body = updatedTodo
  } catch (err) {
    console.log('error while updating todo:', err.message)
    ctx.status = 404
    ctx.body = err.message
  }
}

export default updateTodo
