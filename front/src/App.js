import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import MainMenu from './containers/MainMenu';
import Game from './containers/Game';
import gameRender from './renders/gameRender';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <MainMenu/>
          <Game showGame={gameRender}/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
