import React, { useState, useEffect } from 'react';

import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Field from './Field';

import classes from './Snakeee.module.css';

const Snakeee = (props) => {
    const [FIELD_SIZE_X, setFIELD_SIZE_X] = useState(20);
    const [FIELD_SIZE_Y, setFIELD_SIZE_Y] = useState(20);
    const [SNAKE_SPEED, setSNAKE_SPEED] = useState(200);
    const [snake, setsnake] = useState([]);
    const [barriers, setbarriers] = useState([]);
    const [direction, setdirection] = useState('y+');
    const [keyPressed, setkeyPressed] = useState('');
    const [gameIsRunning, setgameIsRunning] = useState(false);
    const [snake_timer, setsnake_timer] = useState(null);
    const [food_timer, setfood_timer] = useState(3000);
    const [barrier_timer, setbarrier_timer] = useState(6000);
    const [barrier_live_timer, setbarrier_live_timer] = useState(10000);
    const [gameWithBarriers, setgameWithBarriers] = useState(false);
    const [score, setscore] = useState(0);
    const [step, setstep] = useState(0);
    const [food, setfood] = useState({ x: -1, y: -1 });
    const [finalMessage, setfinalMessage] = useState('Press start for the game');

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPressed);
        return () => {
            window.removeEventListener('keydown', handleKeyPressed);
        };
    }, [])

    useEffect(() => { move() }, [step])

    useEffect(() => { changeDirection() }, [keyPressed])

    const move = () => {
        if (!snake[0]) {
            return;
        }
        let newX = snake[0].x;
        let newY = snake[0].y;
        if (direction === 'x-') {
            newX--;
            if (newX === -1) {
                newX = FIELD_SIZE_X - 1;
            }
        }
        else if (direction === 'x+') {
            newX++;
            if (newX === FIELD_SIZE_X) {
                newX = 0;
            }
        }
        else if (direction === 'y+') {
            newY--;
            if (newY === -1) {
                newY = FIELD_SIZE_Y - 1;
            }
        }
        else if (direction === 'y-') {
            newY++;
            if (newY === FIELD_SIZE_Y) {
                newY = 0;
            }
        }
        if (barriers.filter(el => { return el.x === newX && el.y === newY }).length === 0
            && snake.filter(el => { return el.x === newX && el.y === newY }).length === 0) {
            const newSnake = [{ x: newX, y: newY }, ...snake];
            if (food.x !== newX || food.y !== newY) {
                newSnake.pop();
            } else {
                setscore(score + 1);
                createFood();
            }
            setsnake(newSnake);
            if (gameIsRunning) {
                setsnake_timer(setTimeout(newStep, SNAKE_SPEED));
            }
        } else {
            finishTheGame();
        }
    }

    const createFood = () => {
        let foodCreated = false;

        while (!foodCreated) {
            const foodX = Math.floor(Math.random() * FIELD_SIZE_X);
            const foodY = Math.floor(Math.random() * FIELD_SIZE_Y);

            if (barriers.filter(el => { return el.x === foodX && el.y === foodY }).length === 0
                && snake.filter(el => { return el.x === foodX && el.y === foodY }).length === 0) {
                setfood({ x: foodX, y: foodY });
                foodCreated = true;
            }
        }
    }

    const destroyBarrier = () => {
        if (barriers.length > 0) {
            setbarriers([...barriers.shift()]);
            barriers.shift();
        }
    }

    const createBarrier = () => {
        let barrierCreated = false;

        while (!barrierCreated) {
            const barrierX = Math.floor(Math.random() * FIELD_SIZE_X);
            const barrierY = Math.floor(Math.random() * FIELD_SIZE_Y);

            if (barriers.filter(el => { return el.x === barrierX && el.y === barrierY }).length === 0
                && snake.filter(el => { return el.x === barrierX && el.y === barrierY }).length === 0) {
                setbarriers([...barriers, { x: barrierX, y: barrierY }]);
                barrierCreated = true;
            }
        }
        setTimeout(destroyBarrier, barrier_live_timer);
    }

    const handleKeyPressed = (e) => {
        setkeyPressed(e.keyCode);
    }

    const changeDirection = () => {
        switch (keyPressed) {
            case 37: // Клавиша влево
                if (direction !== 'x+') {
                    setdirection('x-');
                }
                break;
            case 38: // Клавиша вверх
                if (direction !== 'y-') {
                    setdirection('y+');
                }
                break;
            case 39: // Клавиша вправо
                if (direction !== 'x-') {
                    setdirection('x+');
                }
                break;
            case 40: // Клавиша вниз
                if (direction !== 'y+') {
                    setdirection('y-');
                }
                break;
        }
    }

    const newStep = () => {
        setstep(step + 1);
    }

    const startTheGame = () => {
        setfinalMessage('');
        setscore(0);
        setsnake([
            {
                x: Math.floor(FIELD_SIZE_X / 2),
                y: Math.floor(FIELD_SIZE_Y / 2)
            },
            {
                x: Math.floor(FIELD_SIZE_X / 2),
                y: Math.floor(FIELD_SIZE_Y / 2) + 1
            }
        ]);
        setsnake_timer(setTimeout(newStep, SNAKE_SPEED));
        setTimeout(createFood, food_timer);
        if (gameWithBarriers) {
            setbarrier_timer(setInterval(createBarrier, barrier_timer));
        }
        setstep(0);
        setgameIsRunning(true);
    }

    const finishTheGame = () => {
        setgameIsRunning(false);
        clearTimeout(snake_timer);
        clearInterval(barrier_timer);
        setsnake([]);
        setfood({ x: -1, y: -1 });
        setfinalMessage('Game over! Your score: ' + score.toString());
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.gameField}>
                <div className={classes.score}>
                    Score: {score}
                </div>
                <div className={classes.field}>
                    <Field
                        X={FIELD_SIZE_X}
                        Y={FIELD_SIZE_Y}
                        snake={snake}
                        barriers={barriers}
                        food={food}
                        finalMessage={finalMessage}
                    />
                </div>
            </div>
            <div className={classes.options}>
                <Button btnType='Main' clicked={startTheGame}>
                    Start
                </Button>
                <Button btnType='Main' clicked={finishTheGame}>
                    Stop
                </Button>
                <div className={classes.settings}>
                    <Input
                        label='X'
                        value={FIELD_SIZE_X}
                        changed={(e) => { setFIELD_SIZE_X(e.target.value); finishTheGame() }}
                    />
                    <Input
                        label='Y'
                        value={FIELD_SIZE_Y}
                        changed={(e) => { setFIELD_SIZE_Y(e.target.value); finishTheGame() }}
                    />
                    <Input
                        label='Snake speed'
                        value={SNAKE_SPEED}
                        changed={(e) => { setSNAKE_SPEED(e.target.value); finishTheGame() }}
                    />
                    <Input
                        label='food timer'
                        value={food_timer}
                        changed={(e) => { setfood_timer(e.target.value); finishTheGame() }}
                    />
                    <Input
                        type='checkbox'
                        label='with barriers'
                        checked={gameWithBarriers}
                        changed={(e) => { setgameWithBarriers(e.target.checked); finishTheGame() }}
                    />
                    <Input
                        label='appear timer'
                        value={barrier_timer}
                        changed={(e) => { setbarrier_timer(e.target.value); finishTheGame() }}
                    />
                    <Input
                        label='live timer'
                        value={barrier_live_timer}
                        changed={(e) => { setbarrier_live_timer(e.target.value); finishTheGame() }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Snakeee;