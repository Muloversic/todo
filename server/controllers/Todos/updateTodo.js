import Todo from '../../models/todoModel'

const updateTodo = async (ctx) => {
  try {
    const { name, active } = ctx.request.body
    const payload = name ? { name } : { active }
    const { id } = ctx.request.params
    const gotTodo = await Todo.findById(id)
    if (!gotTodo) {
      console.log('todo was not found by id while updating')
      ctx.notFound('todo was not found')
      return
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, payload, { new: true })
    console.log('todo was updated')
    ctx.resolve(updatedTodo)
  } catch (err) {
    console.log('error while updating todo:', err.message)
    ctx.notFound(err.message)
  }
}

export default updateTodo
