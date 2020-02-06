import React, { lazy, Suspense } from 'react';

const gameRender = name => {
  if (!name) {
    return <div>Landing page is comming!</div>;
  }
  if (name === 'Snakeee') {
    const Snakeee = lazy(() => import('../games/Snakeee'));
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Snakeee />
      </Suspense>
    );
  }
  return <div>No such game jet!</div>;
};

export default gameRender;
