import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import InputWithList from '../UI/InputWithList';
import { changeGame } from '../../store/actions/appActions';

import classes from './GamesList.module.css';

export const GameList = ({
  games,
  activeGame,
  isFavorite,
  dispatch,
}) => {
  const { t } = useTranslation();
  return (
    <div className={classes.wrapper}>
      <InputWithList
        data={games.map(el => {
          return { id: el.id, name: t(el.name) };
        })}
        label={t('games for you')}
        showField={false}
        changed={() => {}}
        value={activeGame ? t(activeGame.name) : ''}
        choose={id => {
          dispatch(changeGame(id));
        }}
        name="gamesList"
      />
      <div className={classes.favorite}>
        {isFavorite ? (
          <i className="fas fa-star" />
        ) : (
          <i className="far fa-star" />
        )}
      </div>
    </div>
  );
};

GameList.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })
  ).isRequired,
  activeGame: PropTypes.exact({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
  }),
  isFavorite: PropTypes.bool,
  dispatch: PropTypes.func,
};

GameList.defaultProps = {
  activeGame: null,
  isFavorite: false,
  dispatch: () => {},
};

const mapStateToProps = store => {
  return {
    games: store.app.games,
    activeGame: store.app.activeGame,
    isFavorite: store.app.isFavorite,
  };
};

export default connect(mapStateToProps)(GameList);
