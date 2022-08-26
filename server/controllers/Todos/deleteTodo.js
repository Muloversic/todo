import todoModel from '../../models/todoModel';

const deleteTodo = async (request, response, id) => {
  try {
    const todo = await todoModel.findByIdAndDelete(id);
    return response.end(JSON.stringify(todo));
  } catch (err) {
    console.log(err);
  }
};

export default deleteTodo;
