import './style.less';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { CheckmarkIcon } from '../../icons';

const Checkbox = ({
  className,
  checked,
  disabled,
  onChange,
  ...otherProps
}) => (
  <div
    {...otherProps}
    className={classNames(
      'checkbox',
      className,
      {
        'disabled': disabled,
        'checked': checked
      }
    )}
    onClick={() => {
      !disabled && onChange(!checked);
    }}
  >
    <div className="checkbox-container">
      <CheckmarkIcon className="checkbox-checkmark"/>
    </div>
  </div>
);

Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  onChange: () => {}
};

export default Checkbox;
