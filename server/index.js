import http from 'http';
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
    console.log(request.method);
    if (request.method === 'OPTIONS') {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
      response.writeHead(200);
      response.end();
    }

    if (request.method === 'POST') {
      postTodo(request, response);
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'not found' }));
    }
  })
  .listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
