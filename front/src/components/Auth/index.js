import React from 'react';
import PropTypes from 'prop-types';

import classes from 'Auth.module.css';

export const Auth = ({ username, login, register, logout }) => {
  return <div className={classes.wrapper}>Auth</div>;
};

Auth.propTypes = {
  username: PropTypes.string,
  login: PropTypes.func,
  register: PropTypes.func,
  logout: PropTypes.func,
};

Auth.defaultProps = {
  username: '',
  login: () => {},
  register: () => {},
  logout: () => {},
};

export default Auth;
