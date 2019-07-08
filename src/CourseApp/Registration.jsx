import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import DetailsCard from '../UI/DetailsCard';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      isRegistering: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isRegistering: true });
    const { name, email, password } = this.state;
    const data = { name, email, password };

    const onSuccess = (response) => {
      this.setState({ isRegistering: false });
      localStorage.setItem('token', response.data.token);
      this.props.history.push('/');
    };

    axios.post('/api/register', data)
      .then(onSuccess);
  }

  renderRegisterForm() {
    const { name, email, password } = this.state;
    return (
      <DetailsCard style={{ margin: '10px auto' }}>
        <form onSubmit={this.handleSubmit} style={{ overflow: 'hidden' }}>
          <div className="form-group">
            <label htmlFor="name">User Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="name"
              className="form-control"
              value={name || ''}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="form-control"
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
              placehoder="Password"
              className="form-control"
              value={password || ''}
              onChange={this.handleInputChange}
            />
          </div>

          <button
            style={{ float: 'right' }}
            className="btn btn-primary"
            type="submit"
            disabled={this.state.isRegistering}
          >
            Register
          </button>
        </form>
      </DetailsCard>
    );
  }

  render() {
    return this.renderRegisterForm();
  }
}

export default withRouter(Register);
