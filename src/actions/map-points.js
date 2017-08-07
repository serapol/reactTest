import * as actionTypes from '../constants/ActionTypes';
import * as ajaxHelper from '../helpers/ajax';
import { API_MAP_POINTS_URL } from '../constants/URLs';

const actions = {
  savePoints: (mapPoints) => (dispatch, getState) => {
    const user = getState().user.data;

    return ajaxHelper
      .post(API_MAP_POINTS_URL, {
        data: mapPoints,
        jwt: user.jwtToken,
      })
      .then(() => {
        dispatch({
          type: actionTypes.MAP_POINTS_SAVED
        });
      });
  },

  loadPoints: () => (dispatch, getState) => {
    const user = getState().user.data;
    return ajaxHelper
      .get(API_MAP_POINTS_URL, {
        jwt: user.jwtToken,
      })
      .then((response) => {
        const { data } = response;

        dispatch({
          type: actionTypes.MAP_POINTS_LOADED,
          payload: data,
        });
      });
  },

  clearPoints: (mapPoints) => (dispatch, getState) => {
    const user = getState().user.data;
    return ajaxHelper
      .del(API_MAP_POINTS_URL, {
        jwt: user.jwtToken,
        data: mapPoints,
      })
      .then((response) => {
        const { data } = response;

        dispatch({
          type: actionTypes.MAP_POINTS_CLEARED,
        });
      });
  },

  addPoint: (point) => ({
    type: actionTypes.ADD_MAP_POINT,
    payload: point,
  }),
};

export default actions;
