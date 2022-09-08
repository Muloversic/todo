import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from '@redux-saga/core'
import logger from 'redux-logger'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger))
sagaMiddleware.run(rootSaga)
export default store
