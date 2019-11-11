import React, { useContext } from 'react';
// import PropTypes from 'prop-types';
import ThemeContext from '../../context/themeContext';

import classes from './Logo.module.css';

const Logo = () => {
    const themeContext = useContext(ThemeContext)
    return (
        <div className={themeContext.currentTheme === 'dark' ? classes.wrapperDark : classes.wrapperLight}>
            Kid games
        </div>
    )
}

// logo.propTypes = {
// }

export default Logo;