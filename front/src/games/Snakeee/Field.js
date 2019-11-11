import React from 'react';
import PropTypes from 'prop-types';

import classes from './Field.module.css';

const field = props => {
    const field = [];
    let cells;
    for (let i = 0; i < props.Y; i++) {
        cells = []
        for (let j = 0; j < props.X; j++) {
            let className = 'cell';
            if (props.food.x === j && props.food.y === i) {
                className = 'cellFood';
            } else if (props.barriers.filter(el => { return el.x === j && el.y === i }).length > 0) {
                className = 'cellBarrier';
            } else if (props.snake.filter(el => { return el.x === j && el.y === i }).length > 0) {
                className = 'cellSnake';
            }
            cells.push(<div key={'cell_' + i + '_' + j} className={classes[className]}></div>)
        }
        field.push(<div key={'row' + i} className={classes.row}>{cells}</div>);
    }
    return (
        <div className={classes.wrapper}>
            {field}
            {
                props.finalMessage
                    ?
                    <div className={classes.finalMessage}>
                        {props.finalMessage}
                    </div>
                    : null
            }
        </div>
    )
}

field.propTypes = {
    X: PropTypes.number.isRequired,
    Y: PropTypes.number.isRequired,
    food: PropTypes.object.isRequired,
    barriers: PropTypes.array.isRequired,
    snake: PropTypes.array.isRequired,
    finalMessage: PropTypes.string,
}

export default field;