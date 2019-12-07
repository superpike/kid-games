import React from 'react';

import Snakeee from '../games/Snakeee';

const gameRender = name => {
  if (!name) {
    return <div>Landing page is comming!</div>;
  }
  if (name === 'Snakeee') {
    return <Snakeee />;
  }
  return <div>No such game jet!</div>;
};

export default gameRender;
