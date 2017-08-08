import React, { Component, PropTypes } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Notification from '../Notification';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className="app-wrapper">
        <Header />
        <div className="content-wrapper">
          {this.props.children}
        </div>
        <Footer />
        <Notification />
      </div>
    );
  }
}

export default App;
