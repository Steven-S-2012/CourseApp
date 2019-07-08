import React from 'react';
// import axios from 'axios';

import auth from '../Utils/auth';

import TimeCard from './TimeCard';
import MainInfo from './MainInfo';


export default class DashBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: auth.loggedIn(),
    };
  }

  render() {
    return (
      <div style={{ overflow: 'hidden', marginBottom: '50px' }}>
        <TimeCard />
        <MainInfo />
      </div>
    );
  }
}
