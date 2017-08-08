import './style.less';

import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';
import { Layer } from '../../components';
import { PlusIcon } from '../../icons';

const BASE_CLASS_NAME = 'dialog';

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
const Dialog = ({
  title,
  open,
  showCloseButton,
  onHide,
  children,
  actions,
  className,
  headerStyle,
  bodyStyle,
  footerStyle,
  ...otherProps
}) => (
  <Layer
    className={`${BASE_CLASS_NAME}-layer`}
    style={{ display: open ? 'block' : 'none' }}
  >
    <ReactCSSTransitionGroup
      component="div"
      transitionName="transition"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={200}
    >
    {open &&
      <div
        {...otherProps}
        className={classNames(
          className,
          BASE_CLASS_NAME
        )}
      >
        {showCloseButton && <PlusIcon
          className={`${BASE_CLASS_NAME}-close`}
          onClick={onHide}
        />}
        <div
          className={`${BASE_CLASS_NAME}-header`}
          style={headerStyle}
        >
          {title}
        </div>
        <div
          className={`${BASE_CLASS_NAME}-body`}
          style={bodyStyle}
        >
          {children}
        </div>
        <div
          className={`${BASE_CLASS_NAME}-footer`}
          style={footerStyle}
        >
          {actions}
        </div>
      </div>
    }
    {open &&
      <div className={`${BASE_CLASS_NAME}-overlay`} onClick={onHide}/>
    }
    </ReactCSSTransitionGroup>
  </Layer>
);

Dialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array,
  ]),
  className: PropTypes.string,
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

Dialog.defaultProps = {
  open: false,
  showCloseButton: true,
  actions: null,
  onHide: () => {}
};

export default Dialog;
