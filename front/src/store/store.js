import { createStore, combineReducers, applyMiddleware } from 'redux';

// Middleware
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import { appReducer } from './reducers/appReducer';

// Reducers
const reducers = combineReducers({
  app: appReducer,
});

const rootReducer = (state, action) => reducers(state, action);

const middleware = applyMiddleware(promise, logger, thunk);

const store = createStore(rootReducer, middleware);
export default store;
