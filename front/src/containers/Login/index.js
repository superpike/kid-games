import React from 'react';
import PropTypes from 'prop-types';

import classes from './Login.module.css';

export const Login = ({ login, cancel }) => {
  return <div className={classes.wrapper}>Login</div>;
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default Login;
