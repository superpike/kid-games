import React from 'react';
import ThemeContext from '../../context/themeContext';

import Logo from '../../components/Logo';
import GamesList from '../../components/GamesList';
import ThemeChanger from '../../components/ThemeChanger';

import classes from './MainMenu.module.css';

const mainMenu = () => {
  return (
    <ThemeContext.Consumer>
      {context => {
        return (
          <div
            className={
              context.currentTheme === 'dark'
                ? classes.wrapperDark
                : classes.wrapperLight
            }
          >
            <div className={classes.logo}>
              <Logo />
            </div>
            <GamesList />
            <ThemeChanger />
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default mainMenu;
