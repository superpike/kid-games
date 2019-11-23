import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Field from './Field';

import classes from './Snakeee.module.css';

const Snakeee = () => {
  const [fieldSizeX, setfieldSizeX] = useState(20);
  const [fieldSizeY, setfieldSizeY] = useState(20);
  const [snakeSpeed, setsnakeSpeed] = useState(200);
  const [snake, setsnake] = useState([]);
  const [barriers, setbarriers] = useState([]);
  const [direction, setdirection] = useState('y+');
  const [keyPressed, setkeyPressed] = useState('');
  const [gameIsRunning, setgameIsRunning] = useState(false);
  const [snakeTimer, setsnakeTimer] = useState(null);
  const [foodTimer, setfoodTimer] = useState(3000);
  const [barrierTimer, setbarrierTimer] = useState(6000);
  const [barrierLiveTimer, setbarrierLiveTimer] = useState(10000);
  const [gameWithBarriers, setgameWithBarriers] = useState(false);
  const [score, setscore] = useState(0);
  const [step, setstep] = useState(0);
  const [food, setfood] = useState({ x: -1, y: -1 });
  const [finalMessage, setfinalMessage] = useState(
    'Press start for the game'
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPressed);
    return () => {
      window.removeEventListener('keydown', handleKeyPressed);
    };
  }, []);

  useEffect(() => {
    move();
  }, [step]);

  useEffect(() => {
    changeDirection();
  }, [keyPressed]);

  const move = () => {
    if (!snake[0]) {
      return;
    }
    let newX = snake[0].x;
    let newY = snake[0].y;
    if (direction === 'x-') {
      newX -= 1;
      if (newX === -1) {
        newX = fieldSizeX - 1;
      }
    } else if (direction === 'x+') {
      newX += 1;
      if (newX === fieldSizeX) {
        newX = 0;
      }
    } else if (direction === 'y+') {
      newY -= 1;
      if (newY === -1) {
        newY = fieldSizeY - 1;
      }
    } else if (direction === 'y-') {
      newY += 1;
      if (newY === fieldSizeY) {
        newY = 0;
      }
    }
    if (
      barriers.filter(el => {
        return el.x === newX && el.y === newY;
      }).length === 0 &&
      snake.filter(el => {
        return el.x === newX && el.y === newY;
      }).length === 0
    ) {
      const newSnake = [{ x: newX, y: newY }, ...snake];
      if (food.x !== newX || food.y !== newY) {
        newSnake.pop();
      } else {
        setscore(score + 1);
        createFood();
      }
      setsnake(newSnake);
      if (gameIsRunning) {
        setsnakeTimer(setTimeout(newStep, snakeSpeed));
      }
    } else {
      finishTheGame();
    }
  };

  const createFood = () => {
    let foodCreated = false;

    while (!foodCreated) {
      const foodX = Math.floor(Math.random() * fieldSizeX);
      const foodY = Math.floor(Math.random() * fieldSizeY);

      if (
        barriers.filter(el => {
          return el.x === foodX && el.y === foodY;
        }).length === 0 &&
        snake.filter(el => {
          return el.x === foodX && el.y === foodY;
        }).length === 0
      ) {
        setfood({ x: foodX, y: foodY });
        foodCreated = true;
      }
    }
  };

  const destroyBarrier = () => {
    if (barriers.length > 0) {
      setbarriers([...barriers.shift()]);
      barriers.shift();
    }
  };

  const createBarrier = () => {
    let barrierCreated = false;

    while (!barrierCreated) {
      const barrierX = Math.floor(Math.random() * fieldSizeX);
      const barrierY = Math.floor(Math.random() * fieldSizeY);

      if (
        barriers.filter(el => {
          return el.x === barrierX && el.y === barrierY;
        }).length === 0 &&
        snake.filter(el => {
          return el.x === barrierX && el.y === barrierY;
        }).length === 0
      ) {
        setbarriers([...barriers, { x: barrierX, y: barrierY }]);
        barrierCreated = true;
      }
    }
    setTimeout(destroyBarrier, barrierLiveTimer);
  };

  const handleKeyPressed = e => {
    setkeyPressed(e.keyCode);
  };

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
      default:
    }
  };

  const newStep = () => {
    setstep(step + 1);
  };

  const startTheGame = () => {
    setfinalMessage('');
    setscore(0);
    setsnake([
      {
        x: Math.floor(fieldSizeX / 2),
        y: Math.floor(fieldSizeY / 2),
      },
      {
        x: Math.floor(fieldSizeX / 2),
        y: Math.floor(fieldSizeY / 2) + 1,
      },
    ]);
    setsnakeTimer(setTimeout(newStep, snakeSpeed));
    setTimeout(createFood, foodTimer);
    if (gameWithBarriers) {
      setbarrierTimer(setInterval(createBarrier, barrierTimer));
    }
    setstep(0);
    setgameIsRunning(true);
  };

  const finishTheGame = () => {
    setgameIsRunning(false);
    clearTimeout(snakeTimer);
    clearInterval(barrierTimer);
    setsnake([]);
    setfood({ x: -1, y: -1 });
    setfinalMessage(`Game over! Your score: ${score.toString()}`);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.gameField}>
        <div className={classes.score}>
          Score:
          {score}
        </div>
        <div className={classes.field}>
          <Field
            X={fieldSizeX}
            Y={fieldSizeY}
            snake={snake}
            barriers={barriers}
            food={food}
            finalMessage={finalMessage}
          />
        </div>
      </div>
      <div className={classes.options}>
        <Button btnType="Main" clicked={startTheGame}>
          Start
        </Button>
        <Button btnType="Main" clicked={finishTheGame}>
          Stop
        </Button>
        <div className={classes.settings}>
          <Input
            label="X"
            name="X"
            value={fieldSizeX}
            changed={e => {
              setfieldSizeX(e.target.value);
              finishTheGame();
            }}
          />
          <Input
            label="Y"
            name="Y"
            value={fieldSizeY}
            changed={e => {
              setfieldSizeY(e.target.value);
              finishTheGame();
            }}
          />
          <Input
            label="Snake speed"
            name="snakeSpeed"
            value={snakeSpeed}
            changed={e => {
              setsnakeSpeed(e.target.value);
              finishTheGame();
            }}
          />
          <Input
            label="food timer"
            name="foodTimer"
            value={foodTimer}
            changed={e => {
              setfoodTimer(e.target.value);
              finishTheGame();
            }}
          />
          <Input
            type="checkbox"
            label="with barriers"
            name="withBarriers"
            checked={gameWithBarriers}
            changed={e => {
              setgameWithBarriers(e.target.checked);
              finishTheGame();
            }}
          />
          <Input
            label="appear timer"
            name="appearTime"
            value={barrierTimer}
            changed={e => {
              setbarrierTimer(e.target.value);
              finishTheGame();
            }}
          />
          <Input
            label="live timer"
            name="liveTimer"
            value={barrierLiveTimer}
            changed={e => {
              setbarrierLiveTimer(e.target.value);
              finishTheGame();
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Snakeee.propTypes = {

// }

export default Snakeee;
