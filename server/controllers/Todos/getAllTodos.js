import url from 'url'
import Todo from '../../models/todoModel'

const getAllTodos = async (ctx) => {
  try {
    const queryObj = url.parse(ctx.request.url, true).query
    let filter = {}
    if (queryObj.active) {
      filter = { active: JSON.parse(queryObj.active) }
    }

    const todos = await Todo.find(filter)
    console.log('all todos were got')
    ctx.status = 200
    ctx.body = todos
  } catch (err) {
    console.log(err.message)
    ctx.body = err.message
  }
}

export default getAllTodos
