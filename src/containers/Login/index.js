/* eslint-disable react/prop-types */
import './styles.less';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import ValidationDecorator from '../../decorators/ValidationDecorator';
import {
  Input,
  Button
} from '../../components';

class LoginPage extends Component {
  static propTypes = {
    validate: PropTypes.func.isRequired,
    getValidationState: PropTypes.func.isRequired,
  };

  state = {
    formData: {}
  };

  componentDidMount() {
    this.checkAuthState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuthState(nextProps);
  }

  checkAuthState(props) {
    const { isAuthenticated } = props.redux.state;
    const { location: { query } } = props;
    const { linkTo } = props.redux.actions.GenericActions;
    const url = query.redirect ? query.redirect : '/';

    if (isAuthenticated) {
      linkTo(url);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.props.validate(this.state.formData)) return;

    this.props.redux.actions.UserActions.login(this.state.formData);
  };

  handleInputChange = (fieldValue, fieldName) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [fieldName]: fieldValue,
      },
    });

    this.props.validate({ [fieldName]: fieldValue });
  };

  render() {
    const { getValidationState } = this.props;

    return (
      <div className="page-content login-page">
        <h1>Sign in</h1>
        <form
          className="login-form"
          onSubmit={this.handleSubmit}
        >
          <Input
            name="email"
            placeholder="Enter E-mail"
            validationState={getValidationState('email').state}
            errorMessage={getValidationState('email').message}
            onInput={this.handleInputChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Enter password"
            validationState={getValidationState('password').state}
            errorMessage={getValidationState('password').message}
            onInput={this.handleInputChange}
          />
          <Button className="btn-rounded">
            Login
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isLogged,
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
)(ValidationDecorator(
  LoginPage,
  {
    'email': [
      'required',
      'email',
    ],
    'password': [
      'required',
      'password',
    ],
  }
));
