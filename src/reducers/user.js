import * as actionTypes from '../constants/ActionTypes';

const initialState = {
  isLogged: false,
  isLogging: false,
  data: null,
  error: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {...state, isLogging: true};
    case actionTypes.LOGIN_SUCCESS:
      return {...state, isLogging: false, isLogged: true, data: action.payload};
    case actionTypes.LOGIN_FAILED:
      return {...state, isLogging: false};
    case actionTypes.LOGOUT:
      return initialState;
      return state;
    default:
      return state;
  }
}

export default userReducer;
