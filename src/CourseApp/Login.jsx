import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import DetailsCard from '../UI/DetailsCard';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLogin: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState = {
      [name]: value,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLogin: true });
    const { email, password } = this.state;
    const data = { email, password };

    const onSuccess = (response) => {
      this.setState({ isLogin: false });
      localStorage.setItem('token', response.data.token);
      this.props.history.push('/');
    };

    axios.post('/api/login', data)
      .then(onSuccess);
  }

  renderLoginForm() {
    const { email, password } = this.state;
    return (
      <DetailsCard style={{ margin: '10px auto' }}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              name="email"
              type="text"
              className="form-control"
              placeholder="Email"
              value={email || ''}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="form-control"
              value={password || ''}
              onChange={this.handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-priamry"
            disabled={this.state.isLogin}
          >
            Log In
          </button>
        </form>
      </DetailsCard>
    );
  }

  render() {
    return this.renderLoginForm();
  }
}

export default withRouter(Login);
