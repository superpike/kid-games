import React from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.module.css';

const modal = (props) => {
  let assignedClasses = [];
  if (props.classesNames) {
    assignedClasses = props.classesNames.split(' ');
  }
  assignedClasses.push('Modal');

  return (
    <>
      {
        props.noBackdrop
          ?
          null
          :
          <div className={classes.backdrop} onClick={props.closeBackdrop}></div>
      }
      <div
        className={assignedClasses.map(el => classes[el]).join(' ')}
      >
        {props.children}
      </div>
    </>
  );
}

modal.propTypes = {
  classesNames: PropTypes.string,
  noBackdrop: PropTypes.bool,
  closeBackdrop: PropTypes.func,
  children: PropTypes.element
} 

export default modal;
