import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';

import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import { AppContext } from './State';
import Login from './pages/Login';

import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import ChatPage from './pages/ChatPage';

setupIonicReact();

const App = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <IonApp>
      {state.user ? (
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tab1">
                <Tab1 />
              </Route>
              <Route exact path="/tab2">
                <Tab2 />
              </Route>
              <Route path="/tab3">
                <Tab3 />
              </Route>
              <Route path="/chatpage">
                <ChatPage />
              </Route>
              <Route exact path="/">
                <Redirect to="/tab1" />
              </Route>
            </IonRouterOutlet>
            {state.noTabs ? (
              <IonTabBar></IonTabBar>
            ) : (
              <IonTabBar className="menu-bar" slot="top">
                <IonTabButton tab="tab1" href="/tab1" className="tabButton">
                  <IonLabel>CHATS</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tab2" className="tabButton">
                  <IonLabel>STATUS</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/tab3" className="tabButton">
                  <IonLabel>CALLS</IonLabel>
                </IonTabButton>
              </IonTabBar>
            )}
          </IonTabs>
        </IonReactRouter>
      ) : (
        <Login />
      )}
    </IonApp>
  );
};

export default App;
