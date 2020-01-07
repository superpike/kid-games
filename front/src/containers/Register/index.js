import React from 'react';
import PropTypes from 'prop-types';

import classes from './Register.module.css';

export const Register = ({ register, cancel }) => {
  return <div className={classes.wrapper}>Register</div>;
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default Register;
