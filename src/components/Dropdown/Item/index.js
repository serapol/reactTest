import React, { Component, PropTypes } from 'react';

class DropdownItem extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    active: PropTypes.bool,
    index: PropTypes.number,
    label: PropTypes.string,
    baseClassName: PropTypes.string,
    className: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
  }

  onClick(event) {
    this.props.onClick(event);
  }

  render() {
    const { className, baseClassName } = this.props;
    let baseClasses = className ? `${baseClassName}-item ${className}` : `${baseClassName}-item`;
    baseClasses += this.props.active ? ' active' : '';

    return (
      <div
        className={baseClasses}
        onClick={this.onClick.bind(this)}
      >
        <span>{this.props.label}</span>
      </div>
    );
  }
}

export default DropdownItem;
