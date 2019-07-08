import React from 'react';
import moment from 'moment-timezone';

import '../Styles/clock.css';

// function convertCityToTimezoneName(city) {
//   if (city.toLowerCase() === 'new york') {
//     return 'America/New_York';
//   } else if (city.toLowerCase() === 'sydney') {
//     return 'Australia/Sydney';
//   } else if (city.toLowerCase() === 'seoul') {
//     return 'Asia/Seoul';
//   } else if (city.toLowerCase() === 'london') {
//     return 'Europe/London';
//   }
//   throw new Error(`Didn't recgonize the city: ${city}`);
// }

export default class Clock extends React.Component {
  constructor() {
    super();
    this.state = { time: new Date() };
  }

  componentDidMount() {
    this.updateTime();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateTime() {
    this.timerID = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  render() {
    const { time } = this.state;
    // const timezone = convertCityToTimezoneName(this.props.city || 'sydney');
    const timezone = this.props.timeZone;

    const localDateTime = moment(time).tz(timezone);
    const date = localDateTime.format('ddd MMM DD YYYY');
    const hours = localDateTime.format('HH');
    const minutes = localDateTime.format('mm');
    const seconds = localDateTime.format('ss');

    return (
      <div className="jr-clock">
        <div className="jr-clock__date">{date}</div>
        <div className="jr-clock__time">
          <div className="jr-clock__time-square">{hours}</div>
          <span className="jr-clock__time-colon">:</span>
          <div className="jr-clock__time-square">{minutes}</div>
          <span className="jr-clock__time-colon">:</span>
          <div className="jr-clock__time-square">{seconds}</div>
        </div>
      </div>
    );
  }
}
