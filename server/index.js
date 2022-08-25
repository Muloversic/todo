import http from 'http';
import url from 'url';
import mongoose from 'mongoose';
import postTodo from './controllers/Todos/createTodo';

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
const server = http
  .createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    const requestPath = url.parse(request.url).path;
    console.log(request.method, requestPath);
    if (request.method === 'OPTIONS') {
      response.writeHead(200);
      response.end();
      return;
    }

    if (request.method === 'POST' && requestPath === '/todos/add') {
      postTodo(request, response);
      response.writeHead(201);
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'not found' }));
    }
  })
  .listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
