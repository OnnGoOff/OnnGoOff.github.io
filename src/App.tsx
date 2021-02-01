import { Box } from '@chakra-ui/react';
import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

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
          <Box overflowY="hidden">
            <HomePage />
          </Box>
        </Route>
        <Route path="/Glenn">
          <Glenn />
        </Route>
        <Route path="/Khor">
          <Khor />
        </Route>
        <Route path="/Onn">
          <Onn />
        </Route>
        <Route path="/Ryan">
          <Ryan />
        </Route>
        <Route path="/Woon">
          <Woon />
        </Route>
      </Switch>
    </Router>
    // </AppContext.Provider>
  );
}

export default App;
