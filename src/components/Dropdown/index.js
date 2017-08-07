import './style.less';
import React, { Component, PropTypes } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '../../icons';
import classNames from 'classnames';
import * as domHelper from '../../helpers/dom';

const BASE_CSS_CLASS_NAME = 'dropdown';
const ITEMS_CONTAINER_MAX_HEIGHT = 235;

const findScrollableParent = (el) => {
  let node = el.parentNode;

  while (node !== null) {
    if (node.offsetWidth !== node.clientWidth) return node;
    node = node.parentNode;
  }

  return false;
};

class Dropdown extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    itemsContainerStyle: PropTypes.object,
    value: PropTypes.any,
    defaultValue: PropTypes.any
  };

  static defaultProps = {
    itemsContainerStyle: {},
    onChange: function () {}
  };

  state = {
    open: false,
    isDropUp: false
  };

  constructor(props, context) {
    super(props, context);

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.toggle = this.toggle.bind(this);
    this.clickAway = this.clickAway.bind(this);
  }

  componentWillUnmount() {
    this.unsetEventListeners();
  }

  clickAway(e) {
    const target = e.target;
    const isTargetArrow = () => {
      const node = target.parentNode || target;

      return node.classList.contains(`${BASE_CSS_CLASS_NAME}-arrow`);
    };

    if (domHelper.isDescendant(this.domNode, target)
      || isTargetArrow()
    ) return;

    this.close();
  }

  setEventListeners() {
    window.addEventListener('click', this.clickAway, false);
  }

  unsetEventListeners() {
    window.removeEventListener('click', this.clickAway, false);
  }

  open() {
    if (React.Children.count(this.props.children) <= 1
      && !this.props.defaultValue
    ) return;

    this.setState({ open: true });

    this.updateDropUpState();

    this.setEventListeners();
  }

  close() {
    this.setState({ open: false });
    this.unsetEventListeners();
  }

  toggle() {
    if (this.state.open) {
      this.close();

      return;
    }

    this.open();
  }

  getDisplayValue() {
    let displayValue = '';
    const { defaultValue } = this.props;

    if (defaultValue) {
      displayValue = defaultValue;
    }

    React.Children.forEach(this.props.children, (child) => {
      if (child && this.props.value === child.props.value) {
        displayValue = child.props.label;
      }
    });

    return displayValue;
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  onItemClick(child) {
    if (this.props.value !== child.props.value) {
      this.props.onChange(child.props.value);
    }

    this.close();
  }

  getModifiedChildren() {
    return React.Children.map(this.props.children, (child) => {
      if (this.props.value !== child.props.value
        || this.props.defaultValue
      ) {
        return React.cloneElement(child, {
          baseClassName: BASE_CSS_CLASS_NAME,
          active: this.props.value === child.props.value,
          onClick: (event) => {
            this.onItemClick(child);
            if (child.props.onClick) child.props.onClick(event);
          }
        });
      }
    });
  }

  updateDropUpState() {
    const dropdownRect = this.domNode.getBoundingClientRect();
    const parentNode = findScrollableParent(this.domNode);
    const parentRect = parentNode ? parentNode.getBoundingClientRect() : { top: 0, bottom: window.innerHeight };
    const itemsContainerMaxBottomPosition = dropdownRect.bottom + ITEMS_CONTAINER_MAX_HEIGHT;
    const itemsContainerMaxTopPosition = dropdownRect.top - ITEMS_CONTAINER_MAX_HEIGHT;
    const isDropUp = itemsContainerMaxBottomPosition > parentRect.bottom
                     && itemsContainerMaxTopPosition > parentRect.top;

    this.setState({
      isDropUp
    });
  }

  render() {
    const {
      className,
      style,
      itemsContainerStyle,
      children,
      defaultValue
    } = this.props;
    const { open, isDropUp } = this.state;
    const countItems = React.Children.count(children);
    const readOnly = countItems <= 1 && !defaultValue;
    const getArrowIcon = () => {
      const ArrowIcon = open ? ArrowUpIcon : ArrowDownIcon;

      if (readOnly) return null;

      return (
        <ArrowIcon
          className={`${BASE_CSS_CLASS_NAME}-arrow`}
          onClick={this.toggle}
        />
      );
    };

    return (
      <div
        className={classNames(
          BASE_CSS_CLASS_NAME,
          className,
          {
            'open': open,
            'read-only': readOnly,
            'drop-up': isDropUp
          }
        )}
        style={style}
        ref={(node) => this.domNode = node}
      >
        <div
          className={`${BASE_CSS_CLASS_NAME}-value`}
          onClick={this.toggle}
        >
          <span>{this.getDisplayValue()}</span>
          {getArrowIcon()}
        </div>
        <div
          className={`${BASE_CSS_CLASS_NAME}-items`}
          style={itemsContainerStyle}
          onClick={this.stopPropagation}
        >
          {this.getModifiedChildren()}
        </div>
      </div>
    );
  }
}

export default Dropdown;
