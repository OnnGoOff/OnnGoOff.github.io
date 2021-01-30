import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import PageWrapper from './components/PageWrapper';

import Glenn from './dev_profiles/Glenn';
import Khor from './dev_profiles/Khor';
import Onn from './dev_profiles/Onn';
import Ryan from './dev_profiles/Ryan';
import Woon from './dev_profiles/Woon';

import HomePage from './HomePage';

// interface AppContextInterface {
//   windowHeight: number;
//   windowWidth: number;
// }

// export const AppContext = React.createContext<AppContextInterface>({ windowHeight: 0, windowWidth: 0 });

function App() {
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // const resizeWindowAction = () => {
  //   setWindowWidth(window.outerWidth);
  //   setWindowHeight(window.outerHeight);
  // };

  // useEffect(() => {
  //   window.addEventListener('resize', resizeWindowAction);
  //   return () => {
  //     window.removeEventListener('resize', resizeWindowAction);
  //   };
  // }, []);

  return (
    // <AppContext.Provider value={{ windowWidth, windowHeight }}>
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
    // </AppContext.Provider>
  );
}

export default App;
