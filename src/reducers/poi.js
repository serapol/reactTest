import * as actionTypes from '../constants/ActionTypes';

const initialState = {
  isLoading: false,
  data: [],
};

function poiReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.POI_LOADING:
      return { ...state, isLoading: true };
    case actionTypes.POI_LOADED:
      return { ...state, isLoading: false, data: action.payload };
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default poiReducer;
