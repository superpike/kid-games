import {
  LOGIN,
  LOGOUT,
  CHANGE_GAME,
  REGISTER,
  SHOW_PAGE,
  LOGIN_OAUTH,
} from '../constants';

import instance from '../axios-docs';

export const loginAction = (email, password) => {
  return {
    type: LOGIN,
    payload: instance.post('/api/auth/login', { email, password }),
  };
};

export const registerAction = (username, email, password) => {
  return {
    type: REGISTER,
    payload: instance.post('/api/auth/registration', {
      username,
      email,
      password,
    }),
  };
};

export const showPage = page => {
  return {
    type: SHOW_PAGE,
    payload: page,
  };
};

export const changeGame = newGame => {
  return {
    type: CHANGE_GAME,
    payload: newGame,
  };
};

export const logoutAction = (timeout = false) => {
  return {
    type: LOGOUT,
    payload: { timeout },
  };
};

export const loginOAuth2Action = name => {
  return {
    type: LOGIN_OAUTH,
    payload: { name },
  };
};
