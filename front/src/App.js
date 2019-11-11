import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import ThemeContext from './context/themeContext';

import MainMenu from './containers/MainMenu';
import Game from './containers/Game';
import gameRender from './renders/gameRender';

import './App.css';

const App = () => {
  const [theme, settheme] = useState('dark');

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <ThemeContext.Provider
            value={
              {
                currentTheme: theme,
                changeTheme: () => { theme === 'dark' ? settheme('ligth') : settheme('dark') }
              }
            }>
            <MainMenu />
            <Game showGame={gameRender} />
          </ThemeContext.Provider>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
