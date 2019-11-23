import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();
const ChangeThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, settheme] = useState('dark');
  const changeTheme = currTheme => {
    if (currTheme === 'dark') {
      settheme('light');
    } else {
      settheme('dark');
    }
  };
  return (
    <ThemeContext.Provider value={theme}>
      <ChangeThemeContext.Provider value={changeTheme}>
        {children}
      </ChangeThemeContext.Provider>
    </ThemeContext.Provider>
  );
};

export const useThemeValue = () => useContext(ThemeContext);

export const useChangeTheme = () => useContext(ChangeThemeContext);

export const useTheme = () => {
  return {
    theme: useContext(ThemeContext),
    changeTheme: useContext(ChangeThemeContext),
  };
};

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ThemeContext;
