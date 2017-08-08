import './style.less';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Button extends Component {
  static propTypes = {
    focused: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    focused: false,
    disabled: false,
  };

  componentDidMount() {
    if (this.props.focused) {
      this.DOMNode.focus();
    }
  }

  render() {
    const {
      className,
      children,
      focused, // eslint-disable-line no-unused-vars
      ...otherProps,
    } = this.props;

    return (
      <button
        {...otherProps}
        ref={(button) => { this.DOMNode = button; }}
        className={classNames(
          'btn-base',
          className
        )}
      >
        {children}
      </button>
    );
  }
}

export default Button;
