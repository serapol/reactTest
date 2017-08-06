import * as actionTypes from '../constants/ActionTypes';

const initialState = {
  logged: false,
  isLoging: false,
  data: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return state;
    case actionTypes.USER_LOGGED:
      return state;
    case actionTypes.LOGOUT:
      return state;
    case actionTypes.REGISTER:
      return state;
    default:
      return state;
  }
}

export default userReducer;
