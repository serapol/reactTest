import * as actionTypes from '../constants/ActionTypes';
import * as ajaxHelper from '../helpers/ajax';
import GenericActions from './generic';
import {
  API_LOGIN_URL,
  API_LOGOUT_URL,
  API_USER_URL,
} from '../constants/URLs';

const actions = {
  login: (data) => (dispatch) => {
    dispatch(actions.startLogin());

    return ajaxHelper
      .post(API_LOGIN_URL, {
        data
      })
      .then((response) => {
        const { data } = response;

        localStorage.setItem('email', data.email);
        localStorage.setItem('hash', data.passwordHash);

        dispatch(actions.loginSuccess(data));
      })
      .catch((error) => {
        dispatch(GenericActions.showNotification(error, 'error'));
        dispatch(actions.loginFailure());
      });

  },

  logout: () => (dispatch) =>
    ajaxHelper
      .get(API_LOGOUT_URL)
      .then(() => {
        localStorage.setItem('email', '');
        localStorage.setItem('hash', '');

        dispatch({
          type: actionTypes.LOGOUT,
        });
      }),

  register: (data) => (dispatch) =>
    ajaxHelper
      .post(API_USER_URL, {
        data
      })
      .then((response) => {
        const { notification } = response;

        dispatch(GenericActions.showNotification(notification));
        dispatch(actions.login({
          email: data.email,
          password: data.password,
        }));
        dispatch(GenericActions.linkTo('/'));
      })
      .catch((error) => dispatch(GenericActions.showNotification(error, 'error'))),

  startLogin: () => ({
    type: actionTypes.LOGIN_REQUEST,
  }),

  loginSuccess: (user) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: user,
  }),

  loginFailure: () => ({
    type: actionTypes.LOGIN_FAILED,
  }),
};

export default actions;
