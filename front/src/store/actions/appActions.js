import { LOGIN, LOGOUT, CHANGE_GAME } from '../constants';

// import instance from '../axios-docs';

export const signInAction = () => {
  return {
    type: LOGIN,
  };
};

export const changeGame = newGame => {
  return {
    type: CHANGE_GAME,
    payload: newGame,
  };
};

export const logout = (timeout = false) => {
  return {
    type: LOGOUT,
    payload: { timeout },
  };
};
