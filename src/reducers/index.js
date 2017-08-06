import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import mapPoints from './map-points';

const rootReducer = combineReducers({
  user,
  mapPoints,
  routing: routerReducer
});

export default rootReducer;
