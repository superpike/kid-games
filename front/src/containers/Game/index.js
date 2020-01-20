import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useThemeValue } from '../../context/themeContext';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  wrapper: {
    marginTop: '5vh',
    minHeight: '95vh',
    backgroundColor: props =>
      props.theme === 'dark' ? '#282c34' : '#a7b5d1',
    color: props => (props.theme === 'dark' ? 'white' : 'black'),
  },
});

const Game = ({ activeGame, showGame }) => {
  const theme = useThemeValue();
  const classes = useStyles({ theme });
  return (
    <div className={classes.wrapper}>
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
