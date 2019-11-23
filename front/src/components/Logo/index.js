import React from 'react';
import PropTypes from 'prop-types';

import { withTheme } from '../../HOC/withTheme';

import classes from './Logo.module.css';

const Logo = ({ theme }) => {
  return (
    <div
      className={
        theme === 'dark' ? classes.wrapperDark : classes.wrapperLight
      }
    >
      Kid games
    </div>
  );
};

Logo.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']).isRequired,
};

export default withTheme(Logo);
