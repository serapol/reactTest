import './style.less';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classname from 'classnames';

const BASE_CLASS_NAME = 'tooltip';

class Tooltip extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    position: PropTypes.oneOf([
      'left',
      'right',
      'top',
      'bottom',
      'leftBottom'
    ]),
    show: PropTypes.bool,
    hideAfterClick: PropTypes.bool,
    onHide: PropTypes.func
  };

  static defaultProps = {
    position: 'top',
    hideAfterClick: false,
    show: false,
    onHide: function () {}
  };

  constructor(props, context) {
    super(props, context);

    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    const { hideAfterClick, anchor } = this.props;
    this.anchorNode = anchor ? ReactDOM.findDOMNode(anchor) : this.tooltipNode.parentNode;

    if (hideAfterClick) {
      this.addEventListeners();
    }

    this.updatePosition();
  }

  componentDidUpdate() {
    this.updatePosition();
  }

  componentWillUnmount() {
    const { hideAfterClick } = this.props;

    if (hideAfterClick) {
      this.removeEventListeners();
    }
  }

  addEventListeners() {
    window.addEventListener('click', this.hide, true);
  }

  removeEventListeners() {
    window.removeEventListener('click', this.hide, true);
  }

  hide() {
    const { show, onHide } = this.props;

    if (!show) return;

    onHide();
  }

  calculatePosition() {
    const anchorElWidth = this.anchorNode.offsetWidth;
    const anchorElHeight = this.anchorNode.offsetHeight;
    const tooltipElWidth = this.tooltipNode.offsetWidth;
    const tooltipElHeight = this.tooltipNode.offsetHeight;
    const position = this.props.position;

    let left = Math.floor(anchorElWidth / 2 - tooltipElWidth / 2);
    let top = Math.floor(anchorElHeight / 2 - tooltipElHeight / 2);

    switch (position) {
      case 'top':
        top = -tooltipElHeight;
        break;
      case 'bottom':
        top = anchorElHeight;
        break;
      case 'left':
        left = -tooltipElWidth;
        break;
      case 'right':
        left = anchorElWidth;
        break;
    }

    return {
      left,
      top,
    };
  }

  updatePosition() {
    let position = this.calculatePosition();

    this.tooltipNode.style.left = `${position.left}px`;
    this.tooltipNode.style.top = `${position.top}px`;
  }

  getRootClass() {
    const {
      className,
      position,
      show,
    } = this.props;

    return classname(
      `${BASE_CLASS_NAME}`,
      className,
      { 'show': show },
      { 'position-top': position === 'top' },
      { 'position-bottom': position === 'bottom' },
      { 'position-left': position === 'left' },
      { 'position-right': position === 'right' },
    );
  }

  render() {
    let rootClass = this.getRootClass();

    return (
      <div
        className={rootClass}
        style={this.props.styles}
        ref={(node) => {this.tooltipNode = node;}}>
        <div className={`${BASE_CLASS_NAME}-content`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Tooltip;
