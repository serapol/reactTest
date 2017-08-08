/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Snackbar } from '../../components';

class Notification extends Component {
  render() {
    const { notification } = this.props.redux.state;
    const { hideNotification } = this.props.redux.actions.GenericActions;

    return (
      <Snackbar
        show={notification.show}
        type={notification.type}
        onHide={hideNotification}
      >
        {notification.message}
      </Snackbar>
    );
  }
}

const mapStateToProps = (state) => ({
  notification: state.app.notification
});

const mapDispatchToProps = (dispatch) => {
  let obj = {};

  Object.keys(Actions).map((actionsName) => {
    if (actionsName !== '__esModule') {
      obj[actionsName] = bindActionCreators(Actions[actionsName], dispatch);
    }
  });

  return obj;
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  redux: {
    state: stateProps,
    actions: dispatchProps
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Notification);
