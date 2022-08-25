import Todo from '../../models/todoModel';
const postTodo = async (request, response) => {
  try {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk.toString();
    });

    request.on('end', async () => {
      const { name, active } = JSON.parse(body);
      const newTodo = await Todo.create({ name, active });
      return response.end(JSON.stringify(newTodo));
    });
  } catch (err) {
    console.log(err);
  }
};

export default postTodo;
