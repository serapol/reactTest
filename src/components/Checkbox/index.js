import './style.less';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { CheckmarkIcon } from '../../icons';

class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    onChange: function () {}
  };

  render() {
    const {
      className,
      style,
      checked,
      disabled,
      onChange
    } = this.props;

    return (
      <div
        className={classNames(
          'checkbox',
          className,
          {
            'disabled': disabled,
            'checked': checked
          }
        )}
        style={style}
        onClick={() => {
          !disabled && onChange(!checked);
        }}
      >
        <div className="checkbox-container">
          <CheckmarkIcon className="checkbox-checkmark"/>
        </div>
      </div>
    );
  }
}

export default Checkbox;
