import React, { createContext } from 'react';

const themeContext = React.createContext({
    currentTheme: 'dark',
    changeTheme: () => {}
});

export default themeContext;