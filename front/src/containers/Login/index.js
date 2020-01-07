import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import {
  loginAction,
  showPage,
  loginOAuth2Action,
} from '../../store/actions/appActions';
import classes from './Login.module.css';

export const Login = ({
  login,
  cancel,
  loginWithGithub,
  loginWithFB,
}) => {
  const { t } = useTranslation();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  return (
    <div className={classes.wrapper}>
      <Input
        placeholder={t('email')}
        name="email"
        label={t('email')}
        value={email}
        changed={e => setemail(e.target.value)}
      />
      <Input
        type="password"
        placeholder={t('password')}
        name="password"
        label={t('password')}
        value={password}
        changed={e => setpassword(e.target.value)}
      />
      <Button
        btnType="Main"
        testId="login"
        clicked={() => login(email, password)}
      >
        {t('login')}
      </Button>
      <Button btnType="Danger" testId="cancel" clicked={cancel}>
        {t('cancel')}
      </Button>
      <div className={classes.oauthButtons}>
        <Button
          testId="loginWithGithub"
          clicked={() => loginWithGithub()}
        >
          <i className="fab fa-github"></i>
        </Button>
        <Button testId="loginWithFB" clicked={() => loginWithFB()}>
          <i className="fab fa-facebook-square"></i>
        </Button>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func,
  cancel: PropTypes.func,
  loginWithGithub: PropTypes.func,
  loginWithFB: PropTypes.func,
};

Login.defaultProps = {
  login: () => {},
  cancel: () => {},
  loginWithGithub: () => {},
  loginWithFB: () => {},
};

const mapStateToProps = store => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, email, password) =>
      dispatch(loginAction(username, email, password)),
    loginWithGithub: () => dispatch(loginOAuth2Action('github')),
    loginWithFB: () => dispatch(loginOAuth2Action('FB')),
    cancel: () => dispatch(showPage('')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
