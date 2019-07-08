import axios from 'axios';

module.exports = {
  logout(token) {
    const data = {
      method: 'GET',
      header: {
        Authorization: `Bearer ${token}`,
      },
    };
    const onSuccess = () => {
      localStorage.removeItem('token');
      this.onChange();
    };
    axios('api/logout', data)
      .then(onSuccess);
  },

  loggedIn() {
    return !!localStorage.token;
  },

  onChange() {},
};
