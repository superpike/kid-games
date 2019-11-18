import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import { ThemeProvider } from './context/themeContext';

import MainMenu from './containers/MainMenu';
import Game from './containers/Game';
import gameRender from './renders/gameRender';

import './App.css';

const App = () => {
  const [theme, settheme] = useState('dark');
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <div className="App">
            <MainMenu />
            <Game showGame={gameRender} />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
