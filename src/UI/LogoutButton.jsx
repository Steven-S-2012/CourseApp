import React from 'react';
import { Route } from 'react-router-dom';
import auth from '../Utils/auth';

const logout = (token, history) => {
  console.log(token, history);
  // auth.logout(token);
  history.push('/');
};

const LogoutButton = () => {
  const token = localStorage.getItem('token');
  return (
    <Route component={props => (
      <a
        role="button"
        type="button"
        tabIndex={0}
        onClick={() => { logout(token, props.history); }}
      >
      Logout
      </a>
    )}
    />
  );
};

export default LogoutButton;
