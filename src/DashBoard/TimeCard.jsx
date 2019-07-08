import React from 'react';
import axios from 'axios';

import auth from '../Utils/auth';

import DetailsCard from '../UI/DetailsCard';
import Button from '../UI/Button';
import WeatherApp from './WeatherApp';
import WorldClock from './WorldClock';
import GoogleMapFrame from '../UI/GoogleMapFrame';

import '../Styles/timeCard.css';

// const saveData = (data) => {
//   try {
//     localStorage.setItem('weather', JSON.stringify(data));
//   } catch(e) {
//     localStorage.setItem('weather', `${data}`);
//   };
// };

export default class TimeCard extends React.Component {
  constructor() {
    super();
    this.state = {
      cityName: 'Sydney',
      data: null,
      isLoading: 'false',
    };

    this.fetchData = this.fetchData.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  handleFieldChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  }

  fetchData() {
    const apiUrl = `https://api.apixu.com/v1/current.json?key=1eb8b1de06614af3a3423418171609&q=${this.state.cityName}`;
    this.setState({ isLoading: true, data: null });
    const onSuccess = (response) => {
      if (!response.error) {
        this.preData = response.data;
        this.setState({ data: response.data, isLoading: false });
      } else {
        this.setState({ isLoading: false, data: this.preData, cityName: this.preData.location.name });
      }
    };
    const onFail = () => {
      this.setState({ isLoading: false, data: this.preData, cityName: this.preData.location.name });
    };
    axios.get(apiUrl).then(onSuccess).catch(onFail);
  }

  render() {
    const { isLoading, data } = this.state;
    const timeZone = data ? data.location.tz_id : 'Australia/Sydney';
    return (
      <div className={this.props.className || 'col-sm-4'}>
        <DetailsCard style={{ maxWidth: '400px' }}>
          <nav className="navbar navbar-default">
            <h3 className="title" style={{ padding: '15px' }}>Daily Weather</h3>
            <DetailsCard.Header style={{ padding: '0 0 15px 15px', paddingRight: '35px',  }}>
              <span className="navbar-brand cityLabel">City:</span>
              <input
                name="cityName"
                type="text"
                className="form-control"
                value={this.state.cityName}
                onChange={this.handleFieldChange}
              />
              <DetailsCard.ButtonGroup>
                <Button
                  primary
                  onClick={this.fetchData}
                >
                  {isLoading ? 'Loading' : 'Load' }
                </Button>
              </DetailsCard.ButtonGroup>
            </DetailsCard.Header>
          </nav>
          <WeatherApp
            isLoading={isLoading}
            data={data}
          />
          <WorldClock
            timeZone={timeZone}
          />
          <GoogleMapFrame
            className="googlemap"
            url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.7454303867416!2d151.20657131516646!3d-33.870450980655775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae3fb870a0cb%3A0xe21b547d906c24ca!2sSydney+Tower+Eye!5e0!3m2!1sen!2sau!4v1561447649318!5m2!1sen!2sau"
          />
        </DetailsCard>
      </div>
    );
  }
}

