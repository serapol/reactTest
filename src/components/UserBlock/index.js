import './style.less';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const BASE_CLASS_NAME = 'user-block';

class UserBlock extends Component {
  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
  };

  getContent() {
    const {
      onLogin,
      onLogout,
      onRegister,
      user: {
        isLogged,
        isLogging,
        data: userData
      },
    } = this.props;

    if (isLogging) {
      return (
        <div className={`${BASE_CLASS_NAME}-content`}>
          <div className="logging-status">Logging...</div>
        </div>
      );
    }

    if (isLogged) {
      return (
        <div className={`${BASE_CLASS_NAME}-content`}>
          <div className="user-name">Hi, {userData.name}</div>
          <i className="vertical-divider"/>
          <div
            className="action-button"
            onClick={onLogout}
          >
            Logout
          </div>
        </div>
      );
    }

    return (
      <div className={`${BASE_CLASS_NAME}-content`}>
        <div
          className="action-button"
          onClick={onLogin}
        >
          Sign in
        </div>
        <i className="vertical-divider"/>
        <div
          className="action-button"
          onClick={onRegister}
        >
          Sign up
        </div>
      </div>
    );
  }

  render() {
    const {
      className,
      onLogin, // eslint-disable-line no-unused-vars
      onLogout, // eslint-disable-line no-unused-vars
      onRegister, // eslint-disable-line no-unused-vars
      user, // eslint-disable-line no-unused-vars
      ...otherProps,
    } = this.props;

    return (
      <div
        {...otherProps}
        className={classNames(
          BASE_CLASS_NAME,
          className
        )}
      >
        {this.getContent()}
      </div>
    );
  }
}

export default UserBlock;
