import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { withTheme } from '../../HOC/withTheme';

import classes from './Logo.module.css';

export const Logo = ({ theme }) => {
  const { t } = useTranslation();
  return (
    <div
      className={
        theme === 'dark' ? classes.wrapperDark : classes.wrapperLight
      }
    >
      {t('logoName')}
    </div>
  );
};

Logo.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']).isRequired,
};

export default withTheme(Logo);
