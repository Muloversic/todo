import todoModel from '../../models/todoModel';
const getAllTodos = async (request, response) => {
  try {
    const todos = await todoModel.find();
    return response.end(JSON.stringify(todos));
  } catch (err) {
    console.log(err);
  }
};

export default getAllTodos;
