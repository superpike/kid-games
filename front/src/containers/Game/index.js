import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ThemeContext from '../../context/themeContext';

import classes from './Game.module.css';

const game = props => {
    return (
        <ThemeContext.Consumer>
            {
                context => {
                    return (
                        <div className={context.currentTheme === 'dark' ? classes.wrapperDark : classes.wrapperLight}>
                            {props.showGame(props.activeGame ? props.activeGame.name : '')}
                        </div>
                    )
                }
            }
        </ThemeContext.Consumer>
    )
}

game.propTypes = {
    activeGame: PropTypes.object,
}

const mapStateToProps = store => {
    return {
        activeGame: store.app.activeGame,
    }
}

export default connect(mapStateToProps)(game);