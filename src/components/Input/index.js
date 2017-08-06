import './Input.less';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Tooltip from '../Tooltip/Tooltip';
import { EyeIcon } from '../../icons';

class Input extends Component {
  static propTypes = {
    style: PropTypes.object,
    inputStyle: PropTypes.object,
    className: PropTypes.string,
    inputLabel: PropTypes.string,
    defaultValue: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    tooltipPosition: PropTypes.string,
    value: PropTypes.any,
    trimValue: PropTypes.bool,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    validationState: React.PropTypes.oneOf([
      'success',
      'error',
      ''
    ]),
    validate: React.PropTypes.func,
    onKeyDown: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func
  };

  static defaultProps = {
    inputLabel: '',
    defaultValue: '',
    type: 'text',
    placeholder: '',
    errorMessage: '',
    tooltipPosition: 'right',
    validationState: '',
    trimValue: true,
    readOnly: false,
    disabled: false,
    validate: function () { return null; },
    onInput: function () {},
    onChange: function () {},
    onKeyDown: function () {},
    onBlur: function () {}
  };

  state = {
    validationState: this.props.validationState,
    showPassword: false
  };

  constructor(props) {
    super(props);

    this.handleBlurInput = this.handleBlurInput.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.validationState !== this.props.validationState) {
      this.setState({
        validationState: nextProps.validationState
      });
    }
  }

  value(value) {
    if (value) {
      this.inputNode.value = value;
      return value;
    }

    return this.inputNode.value;
  }

  focus() {
    this.inputNode.focus();
  }

  getInputNode() {
    return this.inputNode;
  }

  handleInput(e) {
    const value = this.props.trimValue ? e.target.value.trim() : e.target.value;
    const isValid = this.props.validate(value);

    this.props.onInput(value, e);

    if (isValid !== null) {
      this.setState({
        validationState: isValid ? 'success' : 'error'
      });
    }
  }

  handleBlurInput(e) {
    if (this.props.trimValue) {
      e.target.value = e.target.value.trim();
    }

    this.props.onBlur(e);
  }

  toggleShowPassword() {
    if (!this.inputNode.value
      && !this.state.showPassword
    ) {
      return;
    }

    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  render() {
    const {
      className,
      style,
      type,
      inputLabel,
      inputStyle,
      errorMessage,
      tooltipPosition,
      validationState,
      trimValue,
      validate,
      ...props
    } = this.props;
    const {
      showPassword
    } = this.state;
    const isInvalid = this.state.validationState === 'error';
    const isPasswordInput = type === 'password';
    let inputType = showPassword ? 'text' : type;

    return (
      <div
        className="form-input"
        style={style}
      >
        {inputLabel && <label>{inputLabel}</label>}
        <input
          {...props}
          className={classNames(
            className,
            {
              'error': isInvalid,
              'password-showed': showPassword
            }
          )}
          type={inputType}
          ref={(node) => this.inputNode = node}
          style={inputStyle}
          onInput={this.handleInput}
          onBlur={this.handleBlurInput}
        />
        {isPasswordInput &&
          <div
            className={classNames(
              'show-password-button',
              {
                'password-showed': showPassword
              }
            )}
            onClick={this.toggleShowPassword}
          >
            <EyeIcon className="eye-icon"/>
          </div>
        }
        {errorMessage &&
        <Tooltip
          anchor={this}
          className="error"
          position={tooltipPosition}
          show={isInvalid}
        >
          {errorMessage}
        </Tooltip>
        }
      </div>
    );
  }
}

export default Input;
