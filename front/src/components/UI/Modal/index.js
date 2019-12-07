import React from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.module.css';

const Modal = ({
  classesNames,
  noBackdrop,
  closeBackdrop,
  children,
}) => {
  let assignedClasses = [];
  if (classesNames) {
    assignedClasses = classesNames.split(' ');
  }
  assignedClasses.push('Modal');

  return (
    <>
      {noBackdrop ? null : (
        <div
          className={classes.backdrop}
          onClick={closeBackdrop}
          onKeyPress={() => {}}
          role="button"
          tabIndex="0"
          aria-label="backdrop"
        />
      )}
      <div
        className={assignedClasses.map(el => classes[el]).join(' ')}
      >
        {children}
      </div>
    </>
  );
};

Modal.propTypes = {
  classesNames: PropTypes.string,
  noBackdrop: PropTypes.bool,
  closeBackdrop: PropTypes.func,
  children: PropTypes.element.isRequired,
};

Modal.defaultProps = {
  classesNames: '',
  noBackdrop: false,
  closeBackdrop: () => {},
};

export default Modal;
