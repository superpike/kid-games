import React from 'react';
import PropTypes from 'prop-types';

import { withTheme } from '../../HOC/withTheme';

import classes from './Field.module.css';

const Field = props => {
    const field = [];
    let cells;
    for (let i = 0; i < props.Y; i++) {
        cells = []
        for (let j = 0; j < props.X; j++) {
            let className = 'cell'+props.theme;
            if (props.food.x === j && props.food.y === i) {
                className = 'cellFood'+props.theme;
            } else if (props.barriers.filter(el => { return el.x === j && el.y === i }).length > 0) {
                className = 'cellBarrier'+props.theme;
            } else if (props.snake.filter(el => { return el.x === j && el.y === i }).length > 0) {
                className = 'cellSnake'+props.theme;
            }
            cells.push(<div key={'cell_' + i + '_' + j} className={classes[className]}></div>)
        }
        field.push(<div key={'row' + i} className={classes.row}>{cells}</div>);
    }
    return (
        <div className={classes['wrapper'+props.theme]}>
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

Field.propTypes = {
    X: PropTypes.number.isRequired,
    Y: PropTypes.number.isRequired,
    food: PropTypes.object.isRequired,
    barriers: PropTypes.array.isRequired,
    snake: PropTypes.array.isRequired,
    finalMessage: PropTypes.string,
}

export default withTheme(Field);