import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { AppContextProvider } from './State';


//HOC which has state management 
const RootComponent = () => {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
};

ReactDOM.render(<RootComponent />, document.getElementById('root'));

serviceWorkerRegistration.unregister();
