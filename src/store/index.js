import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

export default function configureStore(appHistory, initialState = {}) {
  const routingMiddleware = routerMiddleware(appHistory);
  let enhancer;

  if (process.env.NODE_ENV !== 'production') {
    const reduxLoggerMiddleware = createLogger();
    let getDebugSessionKey = function () {
      // By default we try to read the key from ?debug_session=<key> in the address bar
      const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
      return (matches && matches.length) ? matches[1] : null;
    };

    enhancer = compose(
      applyMiddleware(thunkMiddleware, routingMiddleware, reduxLoggerMiddleware),

      window.devToolsExtension ?
        window.devToolsExtension() :
        require('../helpers/DevTools').default.instrument(),

      // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
      persistState(getDebugSessionKey())
    );
  } else {
    enhancer = compose(applyMiddleware(thunkMiddleware, routingMiddleware));
  }

  const store = createStore(rootReducer, enhancer);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
