import axios from 'axios';

const BASE_URL = 'http://localhost:8080/todos';

export const loadTodosAPI = async (filterType) => {
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

export const addTodoAPI = async (payload) => {
  try {
    const postTodo = await axios.post(BASE_URL, payload);
    const { data } = postTodo.data.body;
    return data;
  } catch (err) {
    console.error('error while creating new todo:', err);
  }
};

export const deleteTodoAPI = async (payload) => {
  try {
    const deleteTodo = await axios.delete(`${BASE_URL}/${payload}`);
    const { data } = deleteTodo.data.body;
    return data;
  } catch (err) {
    console.error('error while deleting todo', err);
  }
};

export const updateTodoAPI = async (payload) => {
  try {
    const updatedTodo = await axios.patch(`${BASE_URL}/${payload._id}`, payload);
    const { data } = updatedTodo.data.body;
    return data;
  } catch (err) {
    console.error('error while updating todo', err);
  }
};

export const deleteAllTodoAPI = async () => {
  try {
    const deleteTodo = await axios.delete(BASE_URL);
    return deleteTodo;
  } catch (err) {
    console.error('error while deleting all todos', err);
  }
};
