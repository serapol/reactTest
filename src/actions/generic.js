import * as actionTypes from '../constants/ActionTypes';
import { push, replace } from 'react-router-redux';

const actions = {
  linkTo: (url, replace) => (dispatch) => {
    if (replace) {
      dispatch(replace(url));
    } else {
      dispatch(push(url));
    }
  },
};

export default actions;
