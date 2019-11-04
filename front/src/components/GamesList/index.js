import React from 'react';
import { connect } from 'react-redux';

import InputWithList from '../UI/InputWithList';
import { changeGame } from '../../store/actions/appActions';

import classes from './GamesList.module.css';

const gamesList = props => {
    return (
        <div className={classes.wrapper}>
            <InputWithList
                data={props.games}
                label='games for you'
                showField={false}
                changed={() => {}}
                value={props.activeGame ? props.activeGame.name : ''}
                choose={(name) => { props.dispatch(changeGame(name)) }}
            />
        </div>
    )
}

const mapStateToProps = store => {
    return {
        games: store.app.games,
        activeGame: store.app.activeGame,
        isFavorite: store.app.isFavorite,
    }
}

export default connect(mapStateToProps)(gamesList);