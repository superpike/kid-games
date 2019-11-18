import React from 'react';
import { useThemeValue } from '../../context/themeContext';

import classes from './ThemeChanger.module.css';

const ThemeChanger = () => {
    const [{ currentTheme }, dispatch] = useThemeValue();
    return (<div className={classes.wrapper}>
        <div
            className={currentTheme === 'dark' ? classes.currentThemeDark : classes.currentThemeLight}
            onClick={() => dispatch({ type: 'changeTheme' })}
        >
            <div
                className={currentTheme === 'dark' ? classes.switcherDark : classes.switcherLight}
            ></div>
        </div>
    </div>
    )
}

export default ThemeChanger;