import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import routes from './routes';
import './styles/main';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const routingMiddleware = routerMiddleware(appHistory);

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(
    thunkMiddleware,
    promiseMiddleware,
    routingMiddleware
  )
);
const history = syncHistoryWithStore(appHistory, store);

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history } routes={ routes } onUpdate={ () => window.scrollTo(0, 0) } />
  </Provider>,
  document.getElementById('root')
);


