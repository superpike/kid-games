import {
    LOGIN, LOGOUT,
    CHANGE_GAME
} from '../constants';

// import instance from '../axios-docs';

export const signInAction = (email, password, robot) => {
    return {
        type: LOGIN,
        // payload: instance.post('/signin', { email, password, robot })
    }
}

export const changeGame = (newGame) => {
    return {
        type: CHANGE_GAME,
        payload: newGame
    }
}

export const logout = (timeout = false) => {
    return {
        type: LOGOUT,
        payload: {timeout}
    }
}