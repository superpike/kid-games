import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

const input = (props) => {
    let assignedClasses = [];
    if (props.inputType) {
        assignedClasses = props.inputType.split(' ').map(el => el + (props.error ? 'Error' : ''));
    }

    assignedClasses.push('InputElement');

    const inputProps = { ...props };
    delete inputProps.inputType;
    delete inputProps.changed;

    return (
        <div className={classes['wrapper' + (props.inputType ? props.inputType : '')]}>
            {props.label
                ?
                <label className={props.error && !props.noTextError ? classes.labelError : classes.label}>{props.label}</label>
                : null}
            <input
                className={assignedClasses.map(el => {
                    return classes[el]
                }).join(' ')}
                {
                ...inputProps
                }
                onChange={props.changed}
                onKeyPress={props.pressed}
            />
            {props.error && !props.noTextError
                ?
                <div className={classes.error}>
                    {props.error}
                </div>
                : null}
        </div>
    );
}

input.propTypes = {
    inputType: PropTypes.string,
    changed: PropTypes.func.isRequired,
    label: PropTypes.string,
    error: PropTypes.string,
    noTextError: PropTypes.bool,
    pressed: PropTypes.func,
}

export default input;