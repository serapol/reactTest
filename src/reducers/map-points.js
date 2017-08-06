import * as actionTypes from '../constants/ActionTypes';

const initialState = {
  loaded: false,
  isLoading: false,
  data: null,
};

function mapPointsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MAP_POINTS_SAVED:
      return state;
    case actionTypes.MAP_POINTS_LOADED:
      return state;
    default:
      return state;
  }
}

export default mapPointsReducer;
