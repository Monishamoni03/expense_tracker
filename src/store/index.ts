import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducer/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const middlewares = [thunk]

export const store = createStore(rootReducer, composeWithDevTools((applyMiddleware(...middlewares))));