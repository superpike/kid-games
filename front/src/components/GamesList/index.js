import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InputWithList from '../UI/InputWithList';
import { changeGame } from '../../store/actions/appActions';

import classes from './GamesList.module.css';

export const gamesList = props => {
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
            <div className={classes.favorite}>
            {
                props.isFavorite
                ?
                <i className="fas fa-star"></i>
                :
                <i className="far fa-star"></i>
            }
            </div>
        </div>
    )
}

gamesList.propsTypes = {
    games: PropTypes.array.isRequired,
    activeGame: PropTypes.object,
    isFavorite: PropTypes.bool, 
}

const mapStateToProps = store => {
    return {
        games: store.app.games,
        activeGame: store.app.activeGame,
        isFavorite: store.app.isFavorite,
    }
}

export default connect(mapStateToProps)(gamesList);