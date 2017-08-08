import * as actionTypes from '../constants/ActionTypes';
import * as ajaxHelper from '../helpers/ajax';
import { API_POI_URL } from '../constants/URLs';

const actions = {
  findNearbyByType: (type, location) => (dispatch, getState) => {
    const user = getState().user.data;

    dispatch({
      type: actionTypes.POI_LOADING,
    });

    return ajaxHelper
      .post(API_POI_URL, {
        jwt: user.jwtToken,
        data: {
          type,
          location
        },
      })
      .then((response) => {
        const { data } = response;

        dispatch({
          type: actionTypes.POI_LOADED,
          payload: data
        });
      });
  },
};

export default actions;
