import axios from 'axios';

const BASE_URL = 'http://localhost:8080/todos';

export const loadTodos = async (filterType) => {
  try {
    let filter = {};
    if (filterType === 'active') {
      filter = { active: true };
    }

    if (filterType === 'done') {
      filter = { active: false };
    }

    const getAllTodos = await axios.get(`${BASE_URL}`, {
      params: filter,
    });

    const { data } = getAllTodos.data.body;
    return data;
  } catch (err) {
    console.error('Errow while getting all todos', err);
  }
};

export const addTodo = async (payload) => {
  try {
    const postTodo = await axios.post(BASE_URL, payload);
    const { data } = postTodo.data.body;
    return data;
  } catch (err) {
    console.error('error while creating new todo:', err);
  }
};
