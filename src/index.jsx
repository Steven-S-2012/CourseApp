import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

import Shell from './CourseApp/Shell';

import './Utils/styles';

axios.defaults.baseURL = 'localhost:3000';

ReactDOM.render(
  <Router>
    <Shell />
  </Router>,
  document.getElementById('root'),
);
