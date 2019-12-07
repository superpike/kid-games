import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

const Input = ({
  inputType,
  changed,
  label,
  error,
  noTextError,
  pressed,
  name,
  value,
  type,
}) => {
  let assignedClasses = [];
  if (inputType) {
    assignedClasses = inputType
      .split(' ')
      .map(el => el + (error ? 'Error' : ''));
  }

  assignedClasses.push('InputElement');

  return (
    <div className={classes[`wrapper${inputType}`]}>
      {label ? (
        <label
          className={
            error && !noTextError ? classes.labelError : classes.label
          }
          htmlFor={name}
        >
          {label}
        </label>
      ) : null}
      <input
        className={assignedClasses
          .map(el => {
            return classes[el];
          })
          .join(' ')}
        onChange={changed}
        onKeyPress={pressed}
        name={name}
        value={value}
        type={type}
      />
      {error && !noTextError ? (
        <div className={classes.error}>{error}</div>
      ) : null}
    </div>
  );
};

Input.propTypes = {
  inputType: PropTypes.string,
  changed: PropTypes.func.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  noTextError: PropTypes.bool,
  pressed: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
};

Input.defaultProps = {
  inputType: '',
  label: '',
  error: '',
  noTextError: false,
  pressed: () => {},
  value: '',
  type: 'text',
};

export default Input;
