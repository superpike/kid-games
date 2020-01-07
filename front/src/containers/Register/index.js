import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import {
  registerAction,
  showPage,
} from '../../store/actions/appActions';
import classes from './Register.module.css';

export const Register = ({ register, cancel }) => {
  const { t } = useTranslation();
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  return (
    <div className={classes.wrapper}>
      <Input
        placeholder={t('username')}
        name="username"
        label={t('username')}
        value={username}
        changed={e => setusername(e.target.value)}
      />
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
      <Button btnType="Main" testId="register" clicked={register}>
        {t('register')}
      </Button>
      <Button btnType="Danger" testId="cancel" clicked={cancel}>
        {t('cancel')}
      </Button>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func,
  cancel: PropTypes.func,
};

Register.defaultProps = {
  register: () => {},
  cancel: () => {},
};

const mapStateToProps = store => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    register: (username, email, password) =>
      dispatch(registerAction(username, email, password)),
    cancel: () => dispatch(showPage('')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
