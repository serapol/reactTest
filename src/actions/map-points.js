import * as actionTypes from '../constants/ActionTypes';
import * as ajaxHelper from '../helpers/ajax';
import GenericActions from './generic';
import { API_MAP_POINTS_URL } from '../constants/URLs';

const actions = {
  savePoints: (mapPoints) => (dispatch, getState) => {
    const user = getState().user.data;

    return ajaxHelper
      .post(API_MAP_POINTS_URL, {
        data: mapPoints,
        jwt: user.jwtToken,
      })
      .then((response) => {
        const { notification } = response;

        dispatch(GenericActions.showNotification(notification));
        dispatch({
          type: actionTypes.MAP_POINTS_SAVED
        });
      })
      .catch((error) => dispatch(GenericActions.showNotification(error, 'error')));
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
      })
      .catch((error) => dispatch(GenericActions.showNotification(error, 'error')));
  },

  clearPoints: (mapPoints) => (dispatch, getState) => {
    const user = getState().user.data;

    return ajaxHelper
      .del(API_MAP_POINTS_URL, {
        jwt: user.jwtToken,
        data: mapPoints,
      })
      .then((response) => {
        const { notification } = response;

        dispatch(GenericActions.showNotification(notification));
        dispatch({
          type: actionTypes.MAP_POINTS_CLEARED,
        });
      })
      .catch((error) => dispatch(GenericActions.showNotification(error, 'error')));
  },

  findNearbyPoi: (category, location) => (dispatch, getState) => {
    const user = getState().user.data;

    return ajaxHelper
      .del(API_MAP_POINTS_URL, {
        jwt: user.jwtToken,
        data: {
          category,
          location
        },
      })
      .then(() => {
        dispatch({
          type: actionTypes.MAP_POINTS_CLEARED,
        });
      })
      .catch((error) => dispatch(GenericActions.showNotification(error, 'error')));
  },

  addPoint: (point) => ({
    type: actionTypes.ADD_MAP_POINT,
    payload: point,
  }),
};

export default actions;
