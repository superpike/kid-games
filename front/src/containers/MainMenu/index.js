import React from 'react';

import Logo from '../../components/Logo';
import GamesList from '../../components/GamesList';

import classes from './MainMenu.module.css';

const mainMenu = props => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.logo}>
                <Logo />
            </div>
            <GamesList />
        </div>
    );
}

export default mainMenu;