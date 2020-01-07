import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ThemeContext from '../../context/themeContext';

import Logo from '../../components/Logo';
import GamesList from '../../components/GamesList';
import ThemeChanger from '../../components/ThemeChanger';
import LanguageChanger from '../../components/LanguageChanger';
import Modal from '../../components/UI/Modal';
import Auth from '../../components/Auth';
import Login from '../Login';
import Register from '../Register';

import classes from './MainMenu.module.css';

export const MainMenu = ({ activePage }) => {
  let page = null;
  if (activePage === 'login') {
    page = (
      <Modal classesNames='Center'>
        <Login />
      </Modal>
    );
  } else if (activePage === 'register') {
    page = (
      <Modal classesNames='Center'>
        <Register />
      </Modal>
    );
  }
  return (
    <ThemeContext.Consumer>
      {context => {
        return (
          <div
            className={
              context.currentTheme === 'dark'
                ? classes.wrapperDark
                : classes.wrapperLight
            }
          >
            {page}
            <div className={classes.logo}>
              <Logo />
            </div>
            <LanguageChanger />
            <GamesList />
            <ThemeChanger />
            <Auth />
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
};

MainMenu.propTypes = {
  activePage: PropTypes.string,
};

MainMenu.defaultProps = {
  activePage: '',
};

const mapStateToProps = store => {
  return {
    activePage: store.app.activePage,
  };
};

export default connect(mapStateToProps)(MainMenu);
