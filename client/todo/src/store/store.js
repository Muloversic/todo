import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from '@redux-saga/core'
import Logger from 'redux-logger'
import rootReducer from './rootReducer'
import saga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, Logger))
sagaMiddleware.run(saga)
export default store
