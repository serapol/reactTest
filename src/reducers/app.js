import * as actionTypes from '../constants/ActionTypes';

const initialState = {
  notification: {
    show: false,
    message: '',
    type: 'success'
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATION:
      return {
        ...state,
        notification: {
          show: true,
          message: action.message,
          type: action.messageType
        }
      };
    case actionTypes.HIDE_NOTIFICATION:
      return {
        ...state,
        notification: {
          show: false,
          message: '',
          type: state.notification.type
        }
      };
    default:
      return state;
  }
}
