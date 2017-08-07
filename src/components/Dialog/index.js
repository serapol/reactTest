import './style.less';

import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
import { Layer } from '../../components';
import { PlusIcon } from '../../icons';

/**
 * Create a new dialog.
 *
 * <Dialog
 *    title="Title",
 *    open={true|false},
 *    actions={<Button>}
 *    onHide={function () {}},
 * >
 *     ..........
 * </Dialog>
 */
class Dialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    showCloseButton: PropTypes.bool,
    actions: PropTypes.node,
    style: PropTypes.object,
    headerStyle: PropTypes.object,
    bodyStyle: PropTypes.object,
    footerStyle: PropTypes.object,
    onHide: PropTypes.func
  };

  static defaultProps = {
    open: false,
    showCloseButton: true,
    actions: null,
    onHide: function () {}
  };

  render() {
    const {
      title,
      open,
      showCloseButton,
      onHide,
      children,
      actions,
      className,
      style,
      headerStyle,
      bodyStyle,
      footerStyle
    } = this.props;

    const containerClassName = classNames(
      className,
      'dialog-container'
    );

    return (
      <Layer className="dialog-layer" style={{ display: open ? 'block' : 'none' }}>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="transition"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}
        >
        {open &&
          <div
            className={containerClassName}
            style={style}
          >
            {showCloseButton && <PlusIcon
              className="dialog-close"
              onClick={onHide}
            />}
            <div
              className="dialog-header"
              style={headerStyle}
            >
              {title}
            </div>
            <div
              className="dialog-body"
              style={bodyStyle}
            >
              {children}
            </div>
            <div
              className="dialog-footer"
              style={footerStyle}
            >
              {actions}
            </div>
          </div>
        }
        {open &&
          <div className="dialog-overlay" onClick={onHide}></div>
        }
        </ReactCSSTransitionGroup>
      </Layer>
    );
  }
}

export default Dialog;
