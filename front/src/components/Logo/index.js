import React from 'react';

import { withTheme } from '../../HOC/withTheme';

import classes from './Logo.module.css';

const Logo = props => {
    return (
        <div className={props.theme === 'dark' ? classes.wrapperDark : classes.wrapperLight}>
            Kid games
        </div>
    )
}

// logo.propTypes = {
// }

export default withTheme(Logo);