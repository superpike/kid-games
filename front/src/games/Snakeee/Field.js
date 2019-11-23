import React from 'react';
import PropTypes from 'prop-types';

import { withTheme } from '../../HOC/withTheme';

import classes from './Field.module.css';

const Field = ({
  X,
  Y,
  food,
  snake,
  barriers,
  theme,
  finalMessage = '',
}) => {
  const field = [];
  let cells;
  for (let i = 0; i < Y; i += 1) {
    cells = [];
    for (let j = 0; j < X; j += 1) {
      let className = `cell${theme}`;
      if (food.x === j && food.y === i) {
        className = `cellFood${theme}`;
      } else if (
        barriers.filter(el => {
          return el.x === j && el.y === i;
        }).length > 0
      ) {
        className = `cellBarrier${theme}`;
      } else if (
        snake.filter(el => {
          return el.x === j && el.y === i;
        }).length > 0
      ) {
        className = `cellSnake${theme}`;
      }
      cells.push(
        <div key={`cell_${i}_${j}`} className={classes[className]} />
      );
    }
    field.push(
      <div key={`row${i}`} className={classes.row}>
        {cells}
      </div>
    );
  }
  return (
    <div className={classes[`wrapper${theme}`]}>
      {field}
      {finalMessage ? (
        <div className={classes.finalMessage}>{finalMessage}</div>
      ) : null}
    </div>
  );
};

Field.propTypes = {
  X: PropTypes.number.isRequired,
  Y: PropTypes.number.isRequired,
  food: PropTypes.exact({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  barriers: PropTypes.arrayOf(
    PropTypes.exact({
      x: PropTypes.number,
      y: PropTypes.number,
    })
  ).isRequired,
  snake: PropTypes.arrayOf(
    PropTypes.exact({
      x: PropTypes.number,
      y: PropTypes.number,
    })
  ).isRequired,
  finalMessage: PropTypes.string,
  theme: PropTypes.oneOf(['dark', 'light']).isRequired,
};

Field.defaultProps = {
  finalMessage: '',
};

export default withTheme(Field);
