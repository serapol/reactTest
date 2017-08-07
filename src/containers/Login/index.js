import './styles.less';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import {
  Input,
  Button
} from '../../components';

class LoginPage extends Component {
  state = {
    formData: {}
  };

  checkAuthState(props) {
    const { isAuthenticated } = props.redux.state;
    const { location: { query } } = props;
    const { linkTo } = props.redux.actions.GenericActions;
    const url = query.redirect ? query.redirect : '/';

    if (isAuthenticated) {
      linkTo(url);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuthState(nextProps);
  }

  componentDidMount() {
    this.checkAuthState(this.props);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.redux.actions.UserActions.login(this.state.formData);
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
      <div className="page-content login-page">
        <h1>Sign in</h1>
        <form
          className="login-form"
          onSubmit={this.handleSubmit}
        >
          <Input
            name="email"
            placeholder="Enter E-mail"
            onInput={this.handleInputChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Enter password"
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
)(LoginPage);
