import React from 'react';
import ReactDOM from 'react-dom';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
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
defineCustomElements(window);

serviceWorkerRegistration.unregister();
