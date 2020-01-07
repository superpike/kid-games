import * as Constants from '../constants';

const initialState = {
  token: localStorage.getItem('token'),
  isLoading: false,
  authError: '',
  isAuth: false,
  username: '',
  games: [
    {
      name: 'Snakeee',
      id: 1,
    },
    {
      name: 'Quiz',
      id: 2,
    },
    {
      name: 'Sapper',
      id: 3,
    },
    {
      name: 'Sea battle',
      id: 4,
    },
    {
      name: 'Mouse catcher',
      id: 5,
    },
    {
      name: 'The best ever',
      id: 6,
    },
  ],
  activeGame: {
    name: 'Snakeee',
    id: 1,
  },
  isFavorite: true,
  favorites: [
    {
      name: 'Snakeee',
      id: 1,
    },
    {
      name: 'Sea battle',
      id: 4,
    },
  ],
  activePage: '',
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.LOGIN_PENDING: {
      localStorage.removeItem('token');
      state = {
        ...state,
        isAuth: false,
        token: '',
        authError: '',
      };
      break;
    }
    case Constants.LOGIN_FULFILLED: {
      localStorage.setItem('token', 'test_user');
      state = {
        ...state,
        isAuth: true,
        token: 'test_user',
      };
      break;
    }
    case Constants.LOGIN_REJECTED: {
      state = {
        ...state,
        authError: 'Something goes wrong',
      };
      break;
    }
    case Constants.REGISTER_PENDING: {
      localStorage.removeItem('token');
      state = {
        ...state,
        isAuth: false,
        token: '',
        authError: '',
      };
      break;
    }
    case Constants.REGISTER_FULFILLED: {
      localStorage.setItem('token', 'test_user');
      state = {
        ...state,
        isAuth: true,
        token: 'test_user',
      };
      break;
    }
    case Constants.REGISTER_REJECTED: {
      state = {
        ...state,
        authError: 'Something goes wrong',
      };
      break;
    }
    case Constants.LOGOUT: {
      localStorage.removeItem('token');
      state = {
        ...state,
        isAuth: false,
        token: '',
        authError: '',
      };
      break;
    }
    case Constants.CHANGE_GAME: {
      const newGame = state.games.filter(
        el => el.id === action.payload
      )[0];
      state = {
        ...state,
        activeGame: newGame,
        isFavorite:
          state.favorites.filter(el => el.id === newGame.id).length >
          0,
      };
      break;
    }
    case Constants.SHOW_PAGE: {
      state = {
        ...state,
        activePage: action.payload,
      };
      break;
    }
    default:
  }
  return state;
};
