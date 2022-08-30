import Todo from '../../models/todoModel'

const deleteTodo = async (ctx) => {
  try {
    const id = ctx.request.url.split('/')[2]
    const gotTodo = await Todo.findById(id)
    if (!gotTodo) {
      ctx.status = 404
      ctx.body = 'todo was not found'
      return
    }

    const todo = await Todo.findByIdAndDelete(id)
    console.log('todo was deleted')
    ctx.status = 200
    ctx.body = todo
  } catch (err) {
    console.log(err.message)
    ctx.status = 404
    ctx.body = err.message
  }
}

export default deleteTodo
