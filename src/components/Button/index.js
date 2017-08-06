import './Button.less';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    focused: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    focused: false,
    disabled: false,
    onClick: function () {}
  };

  componentDidMount() {
    if (this.props.focused) {
      this.DOMNode.focus();
    }
  }

  render() {
    const {
      onClick,
      className,
      children,
      disabled
    } = this.props;

    return (
      <button
        ref={(button) => { this.DOMNode = button; }}
        className={classNames(
          'btn-base',
          className
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}

export default Button;
