import React from 'react';
import ThemeContext from '../../context/themeContext';

import classes from './ThemeChanger.module.css';

const themeChanger = (props) => {
    return (
        <ThemeContext.Consumer>
            {
                context => {
                    return (<div className={classes.wrapper}>
                        <div className={context.currentTheme === 'dark' ? classes.currentThemeDark : classes.currentThemeLight} onClick={context.changeTheme}>
                            <div className={context.currentTheme === 'dark' ? classes.switcherDark : classes.switcherLight} onClick={context.changeTheme}>

                            </div>
                        </div>
                    </div>)
                }
            }
        </ThemeContext.Consumer>
    )
}

export default themeChanger;