import './Snackbar.less';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Layer from '../Layer/Layer';

const BASE_CLASS_NAME = 'snackbar';

class Snackbar extends Component {
  autoHideTimerId = null;

  static propTypes = {
    show: PropTypes.bool.isRequired,
    type: PropTypes.oneOf([
      'success',
      'notice',
      'error'
    ]),
    onHide: PropTypes.func,
    autoHideDuration: PropTypes.number
  };

  static defaultProps = {
    show: false,
    type: 'success',
    autoHideDuration: 4000,
    onHide: function () {}
  };

  constructor(props, context) {
    super(props, context);

    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    const { show } = this.props;

    if (show) {
      this.addEventListeners();
      this.setAutoHideTimer();
    }
  }

  componentDidUpdate() {
    const { show } = this.props;

    if (show) {
      this.removeEventListeners();
      this.addEventListeners();

      this.setAutoHideTimer();
    }
  }

  componentWillUnmount() {
    this.removeEventListeners();
    clearTimeout(this.autoHideTimerId);
  }

  addEventListeners() {
    window.addEventListener('click', this.hide, true);
  }

  removeEventListeners() {
    window.removeEventListener('click', this.hide, true);
  }

  setAutoHideTimer() {
    const { autoHideDuration } = this.props;

    if (autoHideDuration <= 0) return;

    clearTimeout(this.autoHideTimerId);
    this.autoHideTimerId = setTimeout(() => {
      this.hide();
    }, autoHideDuration);
  }

  hide() {
    const {
      show,
      onHide
    } = this.props;

    if (show) {
      this.removeEventListeners();
      clearTimeout(this.autoHideTimerId);
      onHide();
    }
  }

  render() {
    const {
      show,
      type,
      children
    } = this.props;

    let baseClasses = classNames(
      `${BASE_CLASS_NAME}-container`,
      `${type}`,
      {
        'show': show
      }
    );

    return (
      <Layer className={`${BASE_CLASS_NAME}-layer`}>
        <div className={baseClasses}>
          {children}
        </div>
      </Layer>
    );
  }
}

export default Snackbar;
