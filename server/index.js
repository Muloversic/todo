import http from 'http';
import url from 'url';
import mongoose from 'mongoose';
import postTodo from './controllers/Todos/createTodo';
import deleteTodo from './controllers/Todos/deleteTodo';
import getAllTodos from './controllers/Todos/getAllTodos';
import deleteAllTodo from './controllers/Todos/deleteAllTodos';

const db = 'mongodb://localhost:27017/todo';
const connectDb = async () => {
  try {
    await mongoose.connect(db);
    console.log('connected to DB');
  } catch (err) {
    console.error(err);
  }
};
connectDb();

const PORT = 8080;
const server = http.createServer();
server.on('request', async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  const requestPath = url.parse(request.url).path;
  const todoIdMatch = request.url.match(/\/todos\/([0-9]+)/);
  console.log(request.method, requestPath);
  if (request.method === 'OPTIONS') {
    response.writeHead(200);
    response.end();
    return;
  }

  if (request.method === 'POST' && requestPath === '/todos/add') {
    await postTodo(request, response);
    response.writeHead(201);
    return;
  }

  if (request.method === 'GET' && requestPath === '/todos') {
    await getAllTodos(request, response);
    return;
  }

  if (request.method === 'DELETE' && todoIdMatch) {
    const id = request.url.split('/')[2];
    await deleteTodo(request, response, id);
    return;
  }

  if (request.method === 'DELETE' && requestPath === '/todos') {
    await deleteAllTodo(request, response);
    return;
  }

  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ message: 'not found' }));
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
