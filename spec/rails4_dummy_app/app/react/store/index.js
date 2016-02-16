import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'

import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, createLogger()),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

