import React, { Component, PropTypes } from 'react';
import {
  unstable_renderSubtreeIntoContainer,
  unmountComponentAtNode
} from 'react-dom';

/**
 * Create a new "layer" on the page, like a modal or overlay.
 * Appending to the body DOM element.
 *
 * <Layer className="layer">
 *     ..........
 * </Layer>
 */
class Layer extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  componentDidMount() {
    this.renderLayer();
  }

  componentDidUpdate() {
    this.renderLayer();
  }

  componentWillUnmount() {
    this.unrenderLayer();
  }

  unrenderLayer() {
    if (!this.layer) {
      return;
    }

    unmountComponentAtNode(this.layer);
    document.body.removeChild(this.layer);
    this.layer = null;
  }

  renderLayer() {
    const {
      className,
      style,
      children
    } = this.props;

    if (!this.layer) {
      this.layer = document.createElement('div');
      document.body.appendChild(this.layer);
    }

    const layerElement = (
      <div className={className} style={style}>
        {children}
      </div>
    );

    unstable_renderSubtreeIntoContainer(this, layerElement, this.layer);
  }

  render() {
    return null;
  }
}

export default Layer;
