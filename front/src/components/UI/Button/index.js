import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

const button = (props) => {
    let assignedClasses = [];
    if (props.btnType) {
        assignedClasses = props.btnType.split(' ');
    }
    assignedClasses.push('Button');

    return (
        <button
            disabled={props.disabled}
            className={assignedClasses.map(el => {
                return classes[el]
            }).join(' ')}
            onClick={props.clicked}>{props.children}</button>
    );
};

button.propTypes = {
    btnType: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    clicked: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired
  } 
  
export default button;