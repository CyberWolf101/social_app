import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react' //npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
//note that vs code sometimes import chakra componets from the wrong path which is /dist

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider >
  </React.StrictMode>

);
//cyber~wolf@gmail.com
// https://wallpapercave.com/social-media-icon-wallpapers