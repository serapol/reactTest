import './styles.less';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import {
  Input,
  Button
} from '../../components';

class RegisterPage extends Component {
  state = {
    formData: {}
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.redux.actions.UserActions.register(this.state.formData);
  };

  handleInputChange = (fieldValue, fieldName) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [fieldName]: fieldValue,
      },
    });
  };

  render() {
    return (
      <div className="register-page">
        <h1>Sign up</h1>
        <form
          onSubmit={this.handleSubmit}
        >
          <Input
            name="name"
            placeholder="Enter your name"
            onInput={this.handleInputChange}
          />
          <Input
            name="email"
            placeholder="Enter your e-mail"
            onInput={this.handleInputChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            onInput={this.handleInputChange}
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
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

const mapStateToProps = (state) => ({});

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
)(RegisterPage);
