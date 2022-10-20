import { createStore, applyMiddleware, Store } from 'redux';
import rootReducer from '../reducer/rootReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const store: Store<InitialState, InitialAction> & {
  dispatch: DispatchType
} = createStore(rootReducer, (applyMiddleware(thunk)));

// export type RootStore = ReturnType<typeof rootReducer>;

// import { createStore, applyMiddleware } from 'redux';
// import rootReducer from '../reducer/rootReducer';
// import logger from 'redux-logger'
// import thunk from 'redux-thunk';

// const middlewares = [thunk]

// if (process.env.NODE_ENV === 'development')
//   middlewares.push(logger)

// export const store = createStore(rootReducer, (applyMiddleware(...middlewares)));

// // export type RootStore = ReturnType<typeof rootReducer>;