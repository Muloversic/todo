import Todo from '../../models/todoModel'

const deleteTodo = async (ctx) => {
  try {
    const { id } = ctx.request.params
    const gotTodo = await Todo.findById(id)
    if (!gotTodo) {
      console.log('todo was not found by id while deleting')
      ctx.status = 404
      ctx.body = 'todo was not found'
      return
    }

    const todo = await Todo.findByIdAndDelete(id)
    console.log('todo was deleted')
    ctx.status = 200
    ctx.body = todo
  } catch (err) {
    console.log('error while deleting todo:', err.message)
    ctx.status = 404
    ctx.body = err.message
  }
}

export default deleteTodo
