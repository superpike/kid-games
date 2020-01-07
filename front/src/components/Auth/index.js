import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Button from '../UI/Button';
import {
  showPage,
  logoutAction,
} from '../../store/actions/appActions';
import classes from './Auth.module.css';

export const Auth = ({ username, login, register, logout }) => {
  const { t } = useTranslation();
  if (username) {
    return (
      <div className={classes.wrapper}>
        <div>{username}</div>
        <Button btnType="Danger" testId="logout" clicked={logout}>
          {t('logout')}
        </Button>
      </div>
    );
  }
  return (
    <div className={classes.wrapper}>
      <Button btnType="Auth" testId="register" clicked={register}>
        {t('register')}
      </Button>
      <Button btnType="Auth" testId="login" clicked={login}>
        {t('login')}
      </Button>
    </div>
  );
};

Auth.propTypes = {
  username: PropTypes.string,
  login: PropTypes.func,
  register: PropTypes.func,
  logout: PropTypes.func,
};

Auth.defaultProps = {
  username: '',
  login: () => {},
  register: () => {},
  logout: () => {},
};

const mapStateToProps = store => {
  return {
    username: store.app.username,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(showPage('login')),
    register: () => dispatch(showPage('register')),
    logout: () => dispatch(logoutAction(false)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
