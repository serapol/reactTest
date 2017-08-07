import React, { Component, PropTypes } from 'react';

export default (WrappedComponent) => {
  // ...and returns another component...
  return class withFormValidation extends Component {
    constructor(props) {
      super(props);

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    validate() {

    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
