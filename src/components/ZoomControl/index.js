import './style.less';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const BASE_CLASS_NAME = 'zoom-control';

class ZoomControl extends Component {
  static propTypes = {
    className: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    value: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func
  };

  static defaultProps = {
    max: -1,
    min: -1,
    step: 1,
    value: 1,
    onChange: () => {}
  };

  increase = () => {
    const {
      max,
      value,
      step,
      onChange,
    } = this.props;
    let newValue = value + step;

    if (max !== -1 && newValue > max) {
      newValue = max;
    }

    onChange(newValue);
  };

  decrease = () => {
    const {
      min,
      value,
      step,
      onChange,
    } = this.props;
    let newValue = value - step;

    if (min !== -1 && newValue < min) {
      newValue = min;
    }

    onChange(newValue);
  };

  render() {
    const {
      className,
      onChange, // eslint-disable-line no-unused-vars
      min, // eslint-disable-line no-unused-vars
      max, // eslint-disable-line no-unused-vars
      step, // eslint-disable-line no-unused-vars
      value, // eslint-disable-line no-unused-vars
      ...otherProps,
    } = this.props;

    return (
      <div
        {...otherProps}
        className={classNames(
          BASE_CLASS_NAME,
          className
        )}
      >
        <div
          className={`${BASE_CLASS_NAME}-increase`}
          onClick={this.increase}
        >+</div>
        <div
          className={`${BASE_CLASS_NAME}-decrease`}
          onClick={this.decrease}
        >-</div>
      </div>
    );
  }
}

export default ZoomControl;
