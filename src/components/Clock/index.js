import React, {Component} from 'react';
import moment from 'moment';

const UPDATE_INTERVAL = 5000;

class Clock extends Component {
  intervalID = null;

  state = {
    time: Date.now()
  };

  componentWillMount() {
    this.intervalID = setInterval(() => this.setState({
      time: Date.now()
    }), UPDATE_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const formattedTime = moment(this.state.time).format('HH:mm');

    return (
      <span>{formattedTime}</span>
    );
  }
}

export default Clock;
