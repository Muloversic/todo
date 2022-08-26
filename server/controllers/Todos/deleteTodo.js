import todoModel from '../../models/todoModel'

const deleteTodo = async (request, response, id) => {
  try {
    const todo = await todoModel.findByIdAndDelete(id)
    return response.end(JSON.stringify(todo))
  } catch (err) {
    console.log(err)
	return response.end(404, JSON.stringify(err.message))
  }
}

export default deleteTodo
