import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

const Button = ({ btnType, disabled, clicked, children, testId }) => {
  let assignedClasses = [];
  if (btnType) {
    assignedClasses = btnType.split(' ');
  }
  assignedClasses.push('Button');

  return (
    <button
      disabled={disabled}
      className={assignedClasses
        .map(el => {
          return classes[el];
        })
        .join(' ')}
      onClick={clicked}
      type="button"
      data-testid={testId}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  btnType: PropTypes.oneOf([
    'Main Middle',
    'Middle',
    'Main',
    'Auth',
    'Danger',
    'Auth Middle',
    'Danger Middle',
  ]).isRequired,
  disabled: PropTypes.bool,
  clicked: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  testId: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  testId: '',
};

export default Button;
