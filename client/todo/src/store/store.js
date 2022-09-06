import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from '@redux-saga/core'
import rootReducer from './rootReducer'
import saga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(saga)
export default store
