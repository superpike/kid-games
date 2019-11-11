import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './InputWithList.module.css';

class InputWithList extends Component {
    state = {
        focused: false,
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showField && !this.state.focused) {
            this.setState({
                focused: true
            })
        } else if (!nextProps.showField && this.state.focused) {
            this.setState({
                focused: false
            })
        }
    }

    handleFocusInput = (val) => {
        this.setState({
            focused: val,
        }, () => {
            if (this.state.focused && this.props.activate) {
                this.props.activate();
            }
        });
    }

    handleBlur = () => {
        // if (this.state.focused
        //     && (this.props.data.findIndex(el => el.name.toLowerCase() === this.props.value.toLowerCase()) !== -1)) {
        //     this.handleFocusInput(false);
        // }
    }

    handleChooseItem = (name) => {
        this.setState({
            focused: false,
        });
        this.props.choose(name)
    }

    render() {
        let assignedClasses = [];
        if (this.props.inputType) {
            assignedClasses = this.props.inputType.split(' ');
        }
        assignedClasses.push('InputElement');

        const inputProps = { ...this.props };
        delete inputProps.inputType;
        delete inputProps.changed;
        delete inputProps.choose;
        delete inputProps.showField;
        delete inputProps.label;

        let itemList = this.props.data.map(el => {
            return (
                <div key={el.id} className={classes.item} onClick={() => this.handleChooseItem(el.name)}>
                    {el.name}
                </div>
            )
        });
        itemList.unshift(
            <div key='text' className={classes.itemHeader}>
                {this.props.selecttext ? this.props.selecttext : 'Select from the list:'}
            </div>
        );

        return (
            <div className={classes.wrapper}>
                {this.props.label ?
                    <label className={classes.label}>{this.props.label}</label>
                    : null
                }
                <div className={classes['inputWrapper' + (this.props.error ? 'Error' : '')]}>
                    <input
                        className={assignedClasses.map(el => {
                            return classes[el]
                        }).join(' ')}
                        {
                        ...inputProps
                        }
                        onChange={this.props.changed}
                        onFocus={() => this.handleFocusInput(true)}
                        onBlur={this.handleBlur}
                    />
                    <div className={classes.icon} onClick={() => this.handleFocusInput(!this.state.focused)}>
                        <i className="fas fa-chevron-down"></i>
                    </div>
                    {this.state.focused
                        ?
                        <div className={classes.listWrapper}>
                            {itemList}
                        </div>
                        : null
                    }
                    {this.props.error
                        ?
                        <div className={classes.error}>
                            {this.props.error}
                        </div>
                        : null}
                </div>
            </div>
        );
    }
}

InputWithList.propTypes = {
    inputType: PropTypes.string,
    changed: PropTypes.func.isRequired,
    label: PropTypes.string,
    showField: PropTypes.bool,
    choose: PropTypes.func.isRequired,
    activate: PropTypes.func,
    data: PropTypes.array.isRequired,
    error: PropTypes.string,
}

export default InputWithList;