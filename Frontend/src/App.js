import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { Home, Classic } from './Pages';
import { Navbar, ClassicGame, Footer } from './Components';

function App() {
  return (
    <div>
      <Navbar/>
      <Router>
        <Switch>
          <Route path='/play-classic'>
            <Classic/>
          </Route>
          <Route path='/'>
            <Home/>
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
