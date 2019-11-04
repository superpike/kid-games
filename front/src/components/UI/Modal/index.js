import React from 'react';

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

export default modal;
