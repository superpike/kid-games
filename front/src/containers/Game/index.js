import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useThemeValue } from '../../context/themeContext';

import classes from './Game.module.css';

const Game = ({ activeGame, showGame }) => {
  const theme = useThemeValue();
  return (
    <div
      className={
        theme === 'dark' ? classes.wrapperDark : classes.wrapperLight
      }
    >
      {showGame(activeGame ? activeGame.name : '')}
    </div>
  );
};

Game.propTypes = {
  activeGame: PropTypes.exact({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
  }),
  showGame: PropTypes.func.isRequired,
};

Game.defaultProps = {
  activeGame: null,
};

const mapStateToProps = store => {
  return {
    activeGame: store.app.activeGame,
  };
};

export default connect(mapStateToProps)(Game);
