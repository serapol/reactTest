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

class RegisterPage extends Component {
  static propTypes = {
    validate: PropTypes.func.isRequired,
    getValidationState: PropTypes.func.isRequired,
  };

  state = {
    formData: {}
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.props.validate(this.state.formData)) return;

    this.props.redux.actions.UserActions.register(this.state.formData);
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
      <div className="register-page">
        <h1>Sign up</h1>
        <form
          onSubmit={this.handleSubmit}
        >
          <Input
            name="name"
            placeholder="Enter your name"
            validationState={getValidationState('name').state}
            errorMessage={getValidationState('name').message}
            onInput={this.handleInputChange}
          />
          <Input
            name="email"
            placeholder="Enter your e-mail"
            validationState={getValidationState('email').state}
            errorMessage={getValidationState('email').message}
            onInput={this.handleInputChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            validationState={getValidationState('password').state}
            errorMessage={getValidationState('password').message}
            onInput={this.handleInputChange}
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            validationState={getValidationState('confirmPassword').state}
            errorMessage={getValidationState('confirmPassword').message}
            onInput={this.handleInputChange}
          />
          <Button className="btn-rounded">
            Register
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

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
  RegisterPage,
  {
    'name': [
      'required',
    ],
    'email': [
      'required',
      'email',
    ],
    'password': [
      'required',
      'password',
    ],
    'confirmPassword': [
      'required',
      'password',
    ],
  }
));
