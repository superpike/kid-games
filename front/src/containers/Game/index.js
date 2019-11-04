import React from 'react';
import {connect} from 'react-redux';

import classes from './Game.module.css';

const game = props => {
    return (
        <div className={classes.wrapper}>
            {props.showGame(props.activeGame ? props.activeGame.name : '')}
        </div>
    )
}

const mapStateToProps = store => {
    return {
        activeGame: store.app.activeGame,
    }
}

export default connect(mapStateToProps)(game);