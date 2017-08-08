import * as actionTypes from '../constants/ActionTypes';

const initialState = {
  isLoading: false,
  isSaving: false,
  data: [],
};

function mapPointsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MAP_POINTS_SAVING:
      return { ...state, isSaving: true };
    case actionTypes.MAP_POINTS_SAVED:
      return { ...state, isSaving: false };
    case actionTypes.MAP_POINTS_LOADING:
      return { ...state, isLoading: true };
    case actionTypes.MAP_POINTS_LOADED:
      return { ...state, isLoading: false, data: action.payload };
    case actionTypes.LOGOUT:
    case actionTypes.MAP_POINTS_CLEARED:
      return initialState;
    case actionTypes.ADD_MAP_POINT:
      return { ...state, data: [...state.data, action.payload] };
    default:
      return state;
  }
}

export default mapPointsReducer;
