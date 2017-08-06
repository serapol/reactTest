import React, { Component, PropTypes } from 'react';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className="app-wrapper">
        {this.props.children}
      </div>
    );
  }
}

export default App;
