/* eslint-disable react/prop-types */
import './style.less';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Clock, UserBlock } from '../../components';

class Header extends Component {
  handleLoginClick = () => {
    const { linkTo } = this.props.redux.actions.GenericActions;

    linkTo('/login');
  };

  handleLogoutClick = () => {
    const { logout } = this.props.redux.actions.UserActions;

    logout();
  };

  handleRegisterClick = () => {
    const { linkTo } = this.props.redux.actions.GenericActions;

    linkTo('/register');
  };

  render() {
    const { user } = this.props.redux.state;

    return (
      <header className="main-header">
        <div className="main-menu">
          <Link
            to="/"
          >
            Home
          </Link>
          <Link
            to="/about"
          >
            About
          </Link>
        </div>
        <Clock />
        <UserBlock
          user={user}
          onLogin={this.handleLoginClick}
          onLogout={this.handleLogoutClick}
          onRegister={this.handleRegisterClick}
        />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  let obj = {};

  Object.keys(Actions).map(function (actionsName) {
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
)(Header);
