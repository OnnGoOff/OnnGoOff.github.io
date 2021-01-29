import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import PageWrapper from './components/PageWrapper';

import Glenn from './dev_profiles/Glenn';
import Khor from './dev_profiles/Khor';
import Onn from './dev_profiles/Onn';
import Ryan from './dev_profiles/Ryan';
import Woon from './dev_profiles/Woon';

import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/Glenn">
          {/* {PageWrapper(Glenn, 'white')} */}
          <Glenn />
        </Route>
        <Route exact path="/Khor">
          {/* {PageWrapper(Khor, 'white')} */}
          <Khor />
        </Route>
        <Route exact path="/Onn">
          {/* {PageWrapper(Onn, 'white')} */}
          <Onn />
        </Route>
        <Route exact path="/Ryan">
          {/* {PageWrapper(Ryan, 'white')} */}
          <Ryan />
        </Route>
        <Route exact path="/Woon">
          {/* {PageWrapper(Woon, 'white')} */}
          <Woon />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
