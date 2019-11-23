import React from 'react';
import { useTheme } from '../../context/themeContext';

import classes from './ThemeChanger.module.css';

const ThemeChanger = () => {
    const { theme, changeTheme} = useTheme();
    return (<div className={classes.wrapper}>
        <div
            className={theme === 'dark' ? classes.currentThemeDark : classes.currentThemeLight}
            onClick={() => changeTheme(theme)}
        >
            <div
                className={theme === 'dark' ? classes.switcherDark : classes.switcherLight}
            ></div>
        </div>
    </div>
    )
}

export default ThemeChanger;