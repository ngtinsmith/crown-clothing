import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import rootReducer from './root-reducer'

const middewares = [logger]

const store = createStore(rootReducer, applyMiddleware(...middewares))

export default store 