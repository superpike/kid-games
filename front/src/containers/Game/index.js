import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useThemeValue } from '../../context/themeContext';

import classes from './Game.module.css';

const Game = props => {
    const [{ currentTheme }] = useThemeValue();
    return (
        <div className={currentTheme === 'dark' ? classes.wrapperDark : classes.wrapperLight}>
            {props.showGame(props.activeGame ? props.activeGame.name : '')}
        </div>
    )
}

Game.propTypes = {
    activeGame: PropTypes.object,
}

const mapStateToProps = store => {
    return {
        activeGame: store.app.activeGame,
    }
}

export default connect(mapStateToProps)(Game);