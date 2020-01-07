import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './InputWithList.module.css';

class InputWithList extends Component {
  state = {
    focused: false,
  };

  componentWillReceiveProps(nextProps) {
    const { focused } = this.state;
    if (nextProps.showField && !focused) {
      this.setState({
        focused: true,
      });
    } else if (!nextProps.showField && focused) {
      this.setState({
        focused: false,
      });
    }
  }

  handleFocusInput = val => {
    this.setState(
      {
        focused: val,
      },
      () => {
        const { focused } = this.state;
        const { activate } = this.props;
        if (focused && activate) {
          activate();
        }
      }
    );
  };

  handleBlur = () => {};

  handleChooseItem = name => {
    this.setState({
      focused: false,
    });
    const { choose } = this.props;
    choose(name);
  };

  render() {
    let assignedClasses = [];
    const {
      inputType,
      data,
      selecttext,
      label,
      error,
      changed,
      name,
    } = this.props;
    const { focused } = this.state;
    if (inputType) {
      assignedClasses = inputType.split(' ');
    }
    assignedClasses.push('InputElement');

    const inputProps = { ...this.props };
    delete inputProps.inputType;
    delete inputProps.changed;
    delete inputProps.choose;
    delete inputProps.showField;
    delete inputProps.label;
    delete inputProps.activate;

    const itemList = data.map(el => {
      return (
        <div
          key={el.id}
          className={classes.item}
          onClick={() => this.handleChooseItem(el.id)}
          onKeyPress={() => {}}
          role="button"
          tabIndex="0"
        >
          {el.name}
        </div>
      );
    });
    itemList.unshift(
      <div key="text" className={classes.itemHeader}>
        {selecttext}
      </div>
    );

    return (
      <div className={classes.wrapper}>
        {label ? (
          <label className={classes.label} htmlFor={name}>
            {label}
          </label>
        ) : null}
        <div
          className={classes[`inputWrapper${error ? 'Error' : ''}`]}
        >
          <input
            className={assignedClasses
              .map(el => {
                return classes[el];
              })
              .join(' ')}
            name={name}
            {...inputProps}
            onChange={changed}
            onFocus={() => this.handleFocusInput(true)}
            onBlur={this.handleBlur}
          />
          <div
            className={classes.icon}
            onClick={() => this.handleFocusInput(!focused)}
            onKeyPress={() => {}}
            role="button"
            tabIndex="0"
          >
            <i className="fas fa-chevron-down" />
          </div>
          {focused ? (
            <div className={classes.listWrapper}>{itemList}</div>
          ) : null}
          {error ? (
            <div className={classes.error}>{error}</div>
          ) : null}
        </div>
      </div>
    );
  }
}

InputWithList.propTypes = {
  inputType: PropTypes.string,
  changed: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  showField: PropTypes.bool,
  choose: PropTypes.func.isRequired,
  activate: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })
  ).isRequired,
  error: PropTypes.string,
  selecttext: PropTypes.string,
};

InputWithList.defaultProps = {
  inputType: '',
  label: '',
  showField: false,
  activate: () => {},
  error: '',
  selecttext: 'Select from the list:',
};

export default InputWithList;
