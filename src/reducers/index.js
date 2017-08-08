import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import mapPoints from './map-points';
import poi from './poi';
import app from './app';

const rootReducer = combineReducers({
  user,
  mapPoints,
  poi,
  app,
  routing: routerReducer,
});

export default rootReducer;
