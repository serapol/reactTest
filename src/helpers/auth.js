import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

export default (WrappedComponent) => {
  class AuthenticatedComponent extends Component {
    componentWillMount() {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        this.props.authFailed();
      }
    }

    render() {
      if (!this.props.isAuthenticated) return null;

      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isLogged,
  });

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      authFailed: () => {
        let location = ownProps.location;
        let redirect = encodeURIComponent(location.pathname + location.search);
        dispatch(push(`/login?redirect=${redirect}`))
      },
    }
  };

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
