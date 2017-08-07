import './style.less';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const BASE_CLASS_NAME = 'zoom-control';

class ZoomControl extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
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
      onChange,
      min,
      max,
      step,
      value,
      ...otherProps,
    } = this.props;

    return (
      <div
        {...otherProps}
        className={classNames(
          BASE_CLASS_NAME,
          className
        )}
        style={this.props.styles}
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
