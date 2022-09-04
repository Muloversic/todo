import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_TODO_REQUEST, LOAD_TODO_SUCCESS } from '../constants';

const BASE_URL = 'http://localhost:8080/todos';

const todosFetch = async () => {
  const getAllTodos = await axios.get(`${BASE_URL}`, {
    params: 'all',
  });

  const { data } = getAllTodos.data.body;
  return data;
};

function* loadTodos({ payload }) {
  try {
    const todos = yield call(todosFetch);
    yield put({ type: LOAD_TODO_SUCCESS, todos });
  } catch (err) {
    console.log(err);
  }
}

function* saga() {
  yield takeEvery(LOAD_TODO_REQUEST, loadTodos);
  console.log('saga runs');
}

export default saga;
