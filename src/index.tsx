import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    // 'persian-green': '#2a9d8f',
    // 'yellow-crayola': '#e9c46a',
    // 'sandy-brown': '#f4a261',
    // 'burnt-sienna': '#e76f51',
    'charcoal-black': '#264653',
    900: '#3e0098',
    800: '#5200a5',
    700: '#5f00ad',
    600: '#6c00b5',
    500: '#7501bb',
    400: '#8b3ac9',
    300: '#a061d3',
    200: '#bb90df',
    100: '#d6bdec',
    50: '#efe4f7',
  },
};

const theme = extendTheme({ colors });

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
