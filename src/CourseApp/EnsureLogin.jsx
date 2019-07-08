import React from 'react';
import { withRouter } from 'react-router-dom';

import auth from '../Utils/auth';

class EnsureLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: auth.loggedIn() };
  }

  componentDidMount() {
    if (!this.state.isLoggedIn) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { isLoggedIn } = this.state;
    if (isLoggedIn) {
      return (
        <div>
          {this.props.children}
        </div>);
    }
    return null;
  }
}

export default withRouter(EnsureLogin);
