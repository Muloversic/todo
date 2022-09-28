import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from '@redux-saga/core'
import logger from 'redux-logger'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
import initSockets from './sockets/initSockets'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
initSockets(store)

export default store
