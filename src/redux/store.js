import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'

import logger from 'redux-logger'

import rootReducer from './root-reducer'

const middewares = [logger]

export const store = createStore(
    rootReducer,
    applyMiddleware(...middewares)
)

export const persistor = persistStore(store)

export default { store, persistor }
