import Todo from '../../models/todoModel'

const deleteTodo = async (ctx) => {
  try {
    const { id } = ctx.request.params
    const gotTodo = await Todo.findById(id)
    if (!gotTodo) {
      console.log('todo was not found by id while deleting')
      ctx.notFound('todo was not found')
      return
    }

    const todo = await Todo.findByIdAndDelete(id)
    console.log('todo was deleted')
    ctx.resolve(todo)
  } catch (err) {
    console.log('error while deleting todo:', err.message)
    ctx.notFound(err.message)
  }
}

export default deleteTodo
